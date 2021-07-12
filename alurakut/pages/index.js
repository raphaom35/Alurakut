import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import {AlurakutMenu ,OrkutNostalgicIconSet} from '../src/lib/AlurakutCommons' 
import {ProfileRelationsBoxWrapper} from '../src/components/ProfilesRelations'

function ProfileSidebar(propriedades){
  console.log(propriedades)
  return(
    <Box className="profileArea"  style={{gridArea:'profileArea'}} >
    <img src={`https://github.com/${propriedades.githubUser}.png`} style={{borderRadius:'8px'}}/>
  </Box>
  )
}

export default function Home() {
  const githubUser ='raphaom35';

  const pessoasFavoritas =['juunegreiros','omariosouto','rafaballerini','GabrielDiasGoncalves','Ceelo17','GuilhermeGDGP'];

  return (
  <>
  <AlurakutMenu githubUser={githubUser} />
  <MainGrid>
    <ProfileSidebar githubUser={githubUser} />
    <div className="welcomeArea" style={{gridArea:'welcomeArea'}}  >
    <Box >
        <h1 className="title">
              Bem vindo(a) 
            </h1>

          <OrkutNostalgicIconSet/>
    </Box>
    </div>
    <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
    <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
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
