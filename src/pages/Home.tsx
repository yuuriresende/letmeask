import illustraionImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';
import { Button } from '../components/Button';

import { useNavigate } from 'react-router-dom';

import { auth, database, firebase } from '../services/firebase'

import { useAuth } from '../hooks/userAuth';
import { FormEvent, useState } from 'react';


export function Home(){
    const history = useNavigate();
    const { user, signInWithGoogle } = useAuth();
    const [roomCode, setRoomCode] = useState('');
    // verifica se tem uma pessoa logada, se nao abre o popup do google
    // usando o await o codigo so abaixo dele so sera executado caso tenha recebido uma resposta de sucesso ou seja = fez o login corretamente
    
    async function handleCreateRoom(){
        if (!user){
           await signInWithGoogle()
        }
            history("/rooms/new"); 
            //essa rota so acontece se estiver autenticado de fato           
    }
    async function handleJoinRoom(event: FormEvent){
        event.preventDefault();
        //previne o comportamento padrão de atualizar a pagina
        if(roomCode.trim()=== ''){
            return;
        }
        const roomRef = await database.ref(`rooms/${roomCode}`).get();
        //busca todos dados dessa sala especifica

        if(!roomRef.exists()){
            alert('sala nao existe');
            return;
        }
        history(`/rooms/${roomCode}`)
    }
    return(
        <div id="page-auth">
            <aside>
                <img src={illustraionImg} alt="ilustracao simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&A ao-vivo</strong>
                <p>tire suas duvidas da audiencia em tempo real</p>
            </aside>
            <main>
                {/* <h1>{value}</h1> */}
                <div className="main-content">
                    <img src={logoImg} alt="logo" />
                
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="imagem do google" />
                        crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                        type="text"
                        placeholder="digite o codigo de sala"
                        onChange={event => setRoomCode(event.target.value)}
                        value={roomCode}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                    
                </div>
            </main>
        </div>
    )

}