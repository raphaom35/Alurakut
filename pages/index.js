import { useState } from "react";
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfilesRelations";
import React from "react";


function ProfileSidebar(propriedades) {
  // console.log(propriedades); 
  return (
    <Box as="aside" className="profileArea" style={{ gridArea: "profileArea" }}>
      <img
        src={`https://github.com/${propriedades.githubUser}.png`}
        style={{ borderRadius: "8px" }}
      />
      <hr />
      <p>
        <a
          className="boxLink"
          href={`https://github.com/${propriedades.githubUser}`}
        >
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

export default function Home() {
  
  const githubUser = "raphaom35";
  const [comunidades,setComunidades]=React.useState([{
    id:'2837837837822',
    title:'Eu odeio acordar cedo',img:'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);
  const pessoasFavoritas = [
    "juunegreiros",
    "omariosouto",
    "rafaballerini",
    "GabrielDiasGoncalves",
    "Ceelo17",
    "GuilhermeGDGP",
  ];
  

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <ProfileSidebar githubUser={githubUser} />
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>

            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subtitle" >Oque você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e){
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);
              const comunidade ={
                id:new Date().toISOString(),
                title:dadosDoForm.get('title'),
                img:dadosDoForm.get('image'),
              }
              const comunidadesAtualizadas=[...comunidades,comunidade];
              setComunidades(comunidadesAtualizadas);             
            }}>
            <div>
              <input
                placeholder="Qual vai ser o nome da sua comunidade?"
                name="title"
                aria-label="Qual vai ser o nome da sua comunidade?"
                type="text"
              />
              </div>
              <div>
              <input
                placeholder="Coloque uma URL para usarmos de capa"
                name="image"
                aria-label="Coloque uma URL para usarmos de capa"
                type="text"
              />
              </div>
              <button  >
              Criar comunidade
              </button>
              <button>
              Escrever depoimento
              </button>
              <button>
              Deixar um scrap
              </button>
            </form>
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
         
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`} >
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
          Minhas comunidades ({comunidades.length})
            </h2>
          <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li id={itemAtual.id} key={itemAtual.id} >
                    <a href={`/users/${itemAtual.title}`} >
                    <img src={itemAtual.img} /> 
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
        {/*    <div className="profileRelationArea" style={{gridArea:'profileRelationArea'}} >
    <Box >
      Cominidades
    </Box>
    </div> */}
      </MainGrid>
    </>
  );
}
