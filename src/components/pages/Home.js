import styles from "./Home.module.css"
import savings from "../../img/savings.svg"
import { LinkButton } from "../layout/LinkButton"


export function Home() {

    return (
    <section className={styles.homeContainer}>

        <h1>Bem-vindo ao <span>Costs</span></h1>
        <p>Começe a gerenciar os seus projetos agora mesmo</p>
        <LinkButton to="/newproject" text="Criar Projeto" />
        <img src={savings} alt="costs" />
        
    </section>
    )

}