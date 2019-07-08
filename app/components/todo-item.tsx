import React from 'react';
import { connect } from 'react-redux';
import TodoTextInput from './todo-text-input';
import { deleteTodo, completeTodo, editingTodo } from '../events/client-events';

import { Todo, State } from '../interfaces';
import { Z_FIXED } from 'zlib';

interface Prop {
	todo: Todo;
	filter: string
}

let cssDestroyForm = {
		height: '0px'
	},
	cssDestroyText = {
		position: 'fixed' as 'fixed',
		top: '-100px'
	},
	cssDestroyEl = {
		textDecoration: 'none'
	},
	cssCompleteButton = {
		display: 'block',
		width: '100%',
		textAlign: 'left' as 'left'
	};

function TodoItem ({ todo, filter }: Prop) { // save

	let isCompleted = todo.completed ? 'completed' : '',
		isEditing = todo.editing ? 'editing' : '',
		newTodo = false,
		element;

	if (todo.editing) {
		element = (
			<TodoTextInput todo={ todo }
				newTodo={ newTodo }
				filter={ filter }
				placeholder="Leaving empty deletes todo!"/>
		);
	} else {
		element = (
			<div className="view">
				<form id="completeForm"
					method="POST"
					action={ `/todos/${ todo.id }?type=COMPLETE_TODO&filter=${ filter }` }>
					<input id="completeTodo"
						className="toggle"
						type="checkbox"
						checked={ todo.completed }
						onChange={ (event) => completeTodo(event, todo.id) } />
					<label htmlFor="completeTodo">
						<button type="submit"
							style={ cssCompleteButton }
							onClick={ (event) => completeTodo(event, todo.id) }
							onDoubleClick={ () => editingTodo(todo.id) }>
							{todo.title}
						</button>
					</label>
				</form>
				<form id="deleteForm"
					method="POST"
					action={ `/todos/${ todo.id }?type=DELETE_TODO&filter=${ filter }` }
					style={ cssDestroyForm }>
					<button type="submit"
						style={ cssDestroyEl}
						className="destroy"
						onClick={ (event) => deleteTodo(event, todo.id) }>
						<span style={ cssDestroyText }>Delete Todo</span>
					</button>
				</form>
			</div>
		);
	}

	return (
		<li className={`todoItem ${isCompleted} ${isEditing}`}>
			{element}
		</li>
	);
}

export default connect((state: State, ownProps: { todoId: number }) => ({
	filter: state.filter,
	todo: state.todos.find((todo) => todo.id === ownProps.todoId)
}))(TodoItem);
