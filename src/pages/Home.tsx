import illustraionImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';
import { Button } from '../components/Button';

import { useNavigate } from 'react-router-dom';

import { auth, firebase } from '../services/firebase'

export function Home(){
    const history = useNavigate();

    function handleCreateRoom(){
        const provider = new firebase.auth.GoogleAuthProvider

        auth.signInWithPopup(provider).then(result => {
            console.log(result)
            history("/rooms/new")
        } )

       
    }

    return(
        <div id="page-auth">
            <aside>
                <img src={illustraionImg} alt="ilustracao simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&A ao-vivo</strong>
                <p>tire suas duvidas da audiencia em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="logo" />
                
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="imagem do google" />
                        crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form>
                        <input 
                        type="text"
                        placeholder="digite o codigo de sala" 
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