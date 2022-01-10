import '../styles/auth.scss';
import illustraionImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';

import { Link } from 'react-router-dom';

export function NewRoom(){
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
                
                   <h2>Criar uma nova sala</h2>
                    <form>
                        <input 
                        type="text"
                        placeholder="nome da sala" 
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