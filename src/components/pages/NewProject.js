import { useNavigate } from "react-router-dom"
import { ProjectForm } from "../projects/ProjectForm"
import styles from "./NewProject.module.css"

export function NewProject() {

    const navigate = useNavigate()

    function createPost(project) {

        //initialize cost and services
        project.cost = 0
        project.services = []

        fetch("http://localhost:5000/projects", {
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
        <h1>New Project</h1>
        <p>Crie seu projeto para depois adicionar os serviços</p>
        <ProjectForm btnText="Criar Projeto" handleSubmit={createPost} />
    </div>
    )

}