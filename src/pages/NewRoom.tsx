import '../styles/auth.scss';
import illustraionImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/userAuth';
import { useState } from 'react';
import { database } from '../services/firebase';
import { useNavigate } from 'react-router-dom';


export function NewRoom(){
   const { user } = useAuth();
    const history = useNavigate()
    const [newRoom, setNewRoom] = useState('')

    async function handleCreateRoom(event: FormEvent){
        event.preventDefault();
        //previne o comportamento padrão de atualizar a pagina
        if (newRoom.trim() === ''){
            return;
        }
        //pega o que foi digitado no input e retira os espaços vazios, se apos isso n sobrar nada nao é possivel criar a sala

        const roomRef = database.ref('rooms')
        //referencia de registro de dado dentro do banco de dados, é mais ou menos parecido como uma linha de um banco de dados
        //vai existir uma "categoria" chamada rooms, incluir dados como nome da sala, e dados iterativos como lista de perguntas
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,

        })
        //jogando informaçao dentro de rooms

        history(`/rooms/${firebaseRoom.key}`)
        //retorna a chave de registro da sala no firebase
    }

    return(
        <div id="page-auth">
            <aside>
                <img src={illustraionImg} alt="ilustracao simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&A ao-vivo</strong>
                <p>tire suas duvidas da audiencia em tempo real</p>
            </aside>
            <main>
                <h1></h1>
                <div className="main-content">
                    <img src={logoImg} alt="logo" />
                   <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input 
                        type="text"
                        placeholder="nome da sala" 
                        onChange={event => setNewRoom(event.target.value)}
                        //toda vez que um usuario digita algo no input, o evento é pego
                        value={newRoom}
                        //caso a variavel newRoom seja modificada ela reflita no input tb
                        />
                        <Button type="submit">
                        Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}