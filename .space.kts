job("Build and push Docker") {
  startOn {
        gitPush {
            branchFilter {
                +"refs/heads/main"
            }
        }
    }
    host("Build artifacts and a Docker image") {
        // generate artifacts required for the image
        // shellScript {
        //     content = """
        //         ./generateArtifacts.sh
        //     """
        // }

        env["HUB_USER"] = "0fcac7bb-54d9-4024-a7c1-2a669e9e060f"
        env["HUB_TOKEN"] = Secrets("spacejob_pat")

        shellScript {
            // login to Docker Hub
            content = """
                docker login 1clicktech.registry.jetbrains.space --username ${'$'}HUB_USER --password "${'$'}HUB_TOKEN"
            """
        }

        dockerBuildPush {
            // Docker context, by default, project root
            // context = "docker"
            // path to Dockerfile relative to project root
            // if 'file' is not specified, Docker will look for it in 'context'/Dockerfile
            ///file = "docker/config/Dockerfile"

            labels["vendor"] = "1clickcapital"
            args["HTTP_PROXY"] = "http://10.20.30.1:123"
            
            val spaceRepo = "1clicktech.registry.jetbrains.space/p/click-capital/oneclickcapital/skydreamers-website"
            // image tags for 'docker push'
            tags {
                +"$spaceRepo:1.0.${"$"}JB_SPACE_EXECUTION_NUMBER"
                +"$spaceRepo:latest"
            }
        }
    }

    container(displayName = "Kubectl", image = "bitnami/kubectl") {
        env["kubeconfig"] = Secrets("indiafirst-do-kubeconfig")
        // ping service 5 times
        shellScript {
            content = """
                echo "${'$'}kubeconfig" > kubeconfig.yaml 
                kubectl --kubeconfig kubeconfig.yaml rollout restart deployment skydreamers-website
             
            """
        }
    }

    container("openjdk:11") {
        kotlinScript { api ->
            api.space().projects.automation.deployments.start(
                project = api.projectIdentifier(),
                targetIdentifier = TargetIdentifier.Key("skydreamers-website"),
                version = "1.0." + System.getenv("JB_SPACE_EXECUTION_NUMBER"),
                // automatically update deployment status based on a status of a job
                syncWithAutomationJob = true
            )
        }
    }

}