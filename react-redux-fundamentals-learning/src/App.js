import React from 'react'
import { Header } from './features/header/Header';
import { TodoList } from './features/todos/TodoList';
import { Footer } from './features/footer/Footer';

function App() {
  return (
    <div style={{ width: 'min(50%, 100vw)', margin: 'auto' }}>
      <header>
        <h1>Redux Fundamentals Example</h1>
      </header>
      <main>
        <section>
          <h2>Todos</h2>
          <div>
            <Header />
            <TodoList />
            <Footer />
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
