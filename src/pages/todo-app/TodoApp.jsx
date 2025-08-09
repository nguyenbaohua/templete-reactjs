import { use, useState } from "react"

export default function TodoApp() {
	const [todos, setTodos] = useState(['Buy groceries', 'Walk the dog', 'Read a book']);

  return(
		<div className="todo-app">
			<h1>Todo App</h1>
			<ul>
				{todos.map((todo, index) => (
					<li key={index}>{todo}</li>
				))}
			</ul>
		</div>
	)
}
