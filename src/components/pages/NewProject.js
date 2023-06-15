import { ProjectForm } from "../projects/ProjectForm"
import styles from "./NewProject.module.css"

export function NewProject() {

    return (
    <div className={styles.newProjectContainer}>
        <h1>New Project</h1>
        <p>Crie seu projeto para depois adicionar os serviços</p>
        <ProjectForm btnText="Criar Projeto" />
    </div>
    )

}