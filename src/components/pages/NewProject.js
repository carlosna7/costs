// aba "criação do projeto"

import { useNavigate } from "react-router-dom"
import { ProjectForm } from "../projects/ProjectForm"
import styles from "./NewProject.module.css"

export function NewProject() {

    const navigate = useNavigate()

    function createPost(project) {

        //initialize cost and services
        project.cost = 0
        project.services = []

        fetch("https://json-test-flax.vercel.app/projects", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json()) 
            .then((data) => {
                console.log(data)
                navigate("/projects", { state: { message: "Projeto criado com sucesso!" } });

            })
            .catch((err) => console.log(err))
        

    }

    return (
    <div className={styles.newProjectContainer}>
        <h1>Novo projeto</h1>
        <p>Crie seu projeto e depois adicione os serviços.</p>
        <ProjectForm btnText="Criar Projeto" handleSubmit={createPost} />
    </div>
    )

}