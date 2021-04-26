import React from 'react';
import QuizScreem from '../../src/screens/Quiz';

export default function QuizCompartilhado({ dbExterno }) {
  return (
    <QuizScreem 
      externalQuestions={dbExterno.questions} 
      externalBg={dbExterno.bg}      
    />    
  );
}

export async function getServerSideProps(context) {

  const [projectName, gitHubUser] = context.query.id.split('___');

  try {
    const dbExterno = await fetch(`https://${projectName}.${gitHubUser}.vercel.app/api/db`)
      .then((respostaDoServer) => {
        if (respostaDoServer.ok) {
          return respostaDoServer.json();
        }
        throw new Error('Falha em pegar os dados');
      })
      .then((respostaConvertidaEmObjeto) => respostaConvertidaEmObjeto)

    return {
      props: {
        dbExterno,
      }
    };
  } catch(err) {
    throw new Error(err);
  }
  
}
