// aba "projetos"

import { useLocation } from "react-router-dom"

import { useState, useEffect } from "react"

import { Message } from "../layout/Message"
import { Container } from "../layout/Container"
import { Loading } from "../layout/Loading"
import { LinkButton } from "../layout/LinkButton"
import { ProjectCard } from "../projects/ProjectCard"

import styles from "./Projects.module.css"

export function Projects() {

    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState([])

    const location = useLocation()
    let message = ""
    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {
        setTimeout(() => {
            fetch("https://json-test-flax.vercel.app/projects", {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                },
            })
                .then((resp) => resp.json()) 
                .then((data) => {
                    setProjects(data)
                    setRemoveLoading(true)
                })
                .catch((err) => console.log(err))
        }, 500)
    }, [])

    function removeProject (id) {
        fetch(`https://json-test-flax.vercel.app/projects/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
            },
        })
            .then((resp) => resp.json()) 
            .then((data) => {
                setProjects(projects.filter((project) => project.id !== id))
                setProjectMessage("projeto removido")
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className={styles.projectContainer} >
            <div className={styles.titleContainer}>
                <h1>Meus projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto" />
            </div>
            {message && <Message type="success" msg={message} />}
            {projectMessage && <Message type="success" msg={projectMessage} />}
            <Container customClass="start" >
                {projects.length > 0 && 
                    projects.map((project) => (
                        <ProjectCard 
                            id={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category.name}
                            key={project.id}
                            handleRemove={removeProject}
                        />
                    ))}
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 }
            </Container>
        </div>
    )

}
