import { useState } from "react";
import nookies from 'nookies';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfilesRelations";
import React from "react";
import { request } from "../src/lib/datocms";





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

function ProfileRelationsBox(propriedades){
  return(
    <ProfileRelationsBoxWrapper>
    <h2 className="smallTitle">
      {propriedades.title} ({propriedades.items.length})
      </h2>
    <ul>
      {/* {console.log(propriedades)} */}
        {propriedades.items.map((itemAtual,index) => {
          if(index <= 5){
          return (
            <li id={itemAtual.id} key={itemAtual.id} >
              <a href={`https://${itemAtual.html_url}`} >
              <img src={itemAtual.avatar_url} /> 
                <span>{itemAtual.login}</span>
              </a>
            </li>
          );
          }
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  );
}

export default function Home(props) {
 
  const githubUser =  props.githubUser;
  const [comunidades,setComunidades]=React.useState([{}]);
  const [pessoasFavoritas,setpessoasFavoritas] = React.useState([{}]);
  function getComunidades(){
    const token = '0a3eef5572144d5c22d03a7ee5d3b4';
    fetch(
      'https://graphql.datocms.com/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: '{ allCommunities { id title imageUrl _status creatorSlug _firstPublishedAt }_allCommunitiesMeta { count }}'
        }),
      }
    )
    .then(res => res.json())
    .then((res) => {
      setComunidades(res.data.allCommunities);
       console.log(res.data.allCommunities);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  
  function getProfilesFavoritos(){
    const token = '0a3eef5572144d5c22d03a7ee5d3b4';
    fetch(
      'https://graphql.datocms.com/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: '{allFavoritepeople { id name _status _firstPublishedAt}_allFavoritepeopleMeta {count}}'
        }),
      }
    )
    .then(res => res.json())
    .then((res) => {
      setpessoasFavoritas(res.data.allFavoritepeople);
       
    })
    .catch((error) => {
      console.log(error);
    });
  }
  const [seguidores, setSeguidores] = React.useState([]);
 /*  React.useEffect(function() {
    
  }, []) */
  // 0 - Pegar o array de dados do github 
  React.useEffect(function() {
    fetch(`https://api.github.com/users/${githubUser}/followers`)
    .then(function (respostaDoServidor) {
      return respostaDoServidor.json();
    })
    .then(function(respostaCompleta) {
      /* console.log(respostaCompleta) */
      setSeguidores(respostaCompleta);
    })
    getComunidades();
    getProfilesFavoritos();
  }, [])

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
                title: dadosDoForm.get('title'),
                  imageUrl: dadosDoForm.get('image'),
                  creatorSlug: githubUser,
              }
              console.log(comunidade);
              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comunidade)
              })
              .then(async (response) => {
                const dados = await response.json();
                console.log(dados.registroCriado);
                const comunidade = dados.registroCriado;
                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas)
                dadosDoForm.set('image', "");
                dadosDoForm.set('title', "");
              })           
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
              {pessoasFavoritas.map((itemAtual,index) => {
                if(index <= 5){
                return (
                  <li key={itemAtual.id}>
                    <a href={`/communities/${itemAtual.name}`} >
                      <img src={`https://github.com/${itemAtual.name}.png`} />
                      <span>{itemAtual.name}</span>
                    </a>
                  </li>
                );
                }
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          {/* <ProfileRelationsBox title="Pessoas da comunidade" items={pessoasFavoritas} /> */}
          <ProfileRelationsBox title="Seguidores" items={seguidores} />
          {/* <ProfileRelationsBox title="Minhas comunidades" items={comunidades} /> */}
          <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
          Minhas comunidades ({comunidades.length})
            </h2>
          <ul>
              {comunidades.map((itemAtual,index) => {
                 if(index <= 5){
                return (
                  <li id={itemAtual.id} key={itemAtual.id} >
                    <a href={`/users/${itemAtual.title}`} >
                    <img src={itemAtual.imageUrl} /> 
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                );
                 }
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
export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN;
  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
        Authorization: token
      }
  })
  .then((resposta) => resposta.json())

  /* if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
  console.log(isAuthenticated); */
  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser
    }, // will be passed to the page component as props
  }
}
