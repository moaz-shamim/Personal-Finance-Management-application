import { Container } from "../components"
import Head from "../components/Head"
import { Outlet } from "react-router-dom"


export default function Layout(){
    return(
        <Container>
            <Head/>
        <div className="flex flex-wrap">
          <div className="p-2 w-full">
            <h1 className="text-2xl font-bold hover:text-gray-200">
              Login to read posts
            </h1>
            <Outlet/>
          </div>
        </div>
      </Container>
    )
}