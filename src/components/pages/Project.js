// aba "edição do projeto"

import styles from "./Project.module.css"

import { v4 as uuidv4 } from "uuid"

import {useParams} from "react-router-dom"
import { useState,useEffect } from "react"

import { Loading } from "../layout/Loading"
import { Container } from "../layout/Container"
import { ProjectForm } from "../projects/ProjectForm"
import { ServiceForm } from "../service/ServiceForm"
import { Message } from "../layout/Message"
import { ServiceCard } from "../service/ServiceCard"

export function Project() {

    const {id} = useParams()
    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState([])
    const [type, setType] = useState([])

    useEffect (() => {
        setTimeout(() => {
            fetch(`https://json-test-flax.vercel.app/projects/${id}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                },
            })
                .then((resp) => resp.json()) 
                .then((data) => {
                    setProject(data)
                    setServices(data.services)
                })
                .catch((err) => console.log(err))
        }, 500)
    }, [id])

    function editPost (project) {
        setMessage("")
        //budget validation
        if (project.budget < project.cost) {
            setMessage("Orçamento não pode ser menor que o custo do projeto!")
            setType("error")
            return false
        }
            
        fetch(`https://json-test-flax.vercel.app/projects/${project.id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json()) 
            .then((data) => {
                setProject(data)
                setServices(data.services)
                setShowProjectForm(false)
                setMessage("projeto atualizado!")
                setType("success")
            })
            .catch((err) => console.log(err))
    }

    function createService(project) {
        setMessage("")
        // last sercice
        const lastService = project.services[project.services.length - 1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)
        // maximum value validation
        if(newCost > parseFloat(project.budget)) {
            setMessage("Orçamento ultrapassado, verifique o valor do sereviço")
            setType("error")
            project.services.pop()
            return false
        }
        //add service cost to project total cost
        project.cost = newCost
        // update project
        fetch(`https://json-test-flax.vercel.app/projects/${project.id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json()) 
            .then((data) => {
                setShowServiceForm(false)
            })
            .catch((err) => console.log(err))
    }

    function removeService(id, cost) {

        const servicesUpdate = project.services.filter(
            (service) => service.id !== id
        )

        const projectUpdated = project
        projectUpdated.services = servicesUpdate
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`https://json-test-flax.vercel.app/projects/${projectUpdated.id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json()) 
            .then((data) => {
                setProject(projectUpdated)
                setServices(servicesUpdate)
                setMessage("Serviço removido com sucesso!")
            })
            .catch((err) => console.log(err))
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm() {
            setShowServiceForm(!showServiceForm)
    }

    return (<>
        {project.name ? (
            <div className={styles.projectDetails} >
                <Container customClass="column" >
                    {message && <Message type={type} msg={message} />}
                    <div className={styles.detaisContainer} >
                        <h1>Projeto: {project.name}</h1>
                        <button className={styles.btn} onClick={toggleProjectForm} >
                            {!showProjectForm ? "Editar projeto" : "Fechar"}
                        </button>
                        {!showProjectForm ? (
                            <div className={styles.projectInfo} >
                                <p>
                                    <span>Categoria: </span> {project.category.name}
                                </p>
                                <p>
                                    <span>Orçamento Total: </span> R$ {project.budget}
                                </p>
                                <p>
                                    <span>Orçamento utilizado: </span> R$ {project.cost}
                                </p>
                            </div>
                        ) : (
                            <div className={styles.projectInfo}  >
                                <ProjectForm 
                                    handleSubmit={editPost} 
                                    btnText="Concluir edição" 
                                    projectData={project} 
                                />
                            </div>
                        )}
                    </div>
                    <div className={styles.serviceFormContainer} >
                        <h2>Adicione um serviço</h2>
                        <button className={styles.btn} onClick={toggleServiceForm} >
                            {!showServiceForm ? "Adicionar serviço" : "Fechar"}
                        </button>
                        <div className={styles.projectInfo} >
                            {showServiceForm && <ServiceForm 
                                handleSubmit={createService}
                                btnText="Adicionar serviço"
                                projectData={project}
                            />}  
                        </div>
                    </div>
                    <h2>Serviços</h2>
                    <Container customClass="start" >
                        {services.length > 0 &&
                            services.map((service) => (
                                <ServiceCard 
                                id={service.id}
                                name={service.name}
                                cost={service.cost}
                                description={service.description}
                                key={service.id}
                                handleRemove={removeService}
                                />
                            ))
                        }
                        {services.length === 0 && <p>não há serviços cadastrados</p>}
                    </Container>
                </Container>
            </div>
        ) : (
            <Loading />
        )}
    </>)
}