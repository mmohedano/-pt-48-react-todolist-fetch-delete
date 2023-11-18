import React, {useState, useEffect} from "react";

let nextId = 0;

const SERVER_URL =
  'https://playground.4geeks.com/apis/fake/todos/user/martaml';
const GET_HTTP_METHOD = 'GET';
const PUT_HTTP_METHOD = 'PUT';

const Home = () => {
	const [thing, setThing] = useState('');
	const [pends, setPends] = useState([]);

	const getInfoAPI = async () => {
		const response = await fetch(SERVER_URL, { method: GET_HTTP_METHOD });
		const PendsState = await response.json();
		setPends(PendsState);
	};

	const createNewTodo = async (label) => {
		const newTodo = { label, id: '', done: false };
		const state = [...pends, newTodo];
		await fetch(SERVER_URL, {
		  method: PUT_HTTP_METHOD,
		  body: JSON.stringify(state),
		  headers: {
			'Content-Type': 'application/json',
		  },
		});
		await getInfoAPI();
	  };

	  const deleteTask = async (label) => {

        let eliminar =  pends.filter(pend =>
			  pend !== label
		)
		console.log(eliminar)

		// const todoDone = { label, id: '', done: true };
		// const state = [...pends, todoDone];
		await fetch(SERVER_URL, {
		  method: PUT_HTTP_METHOD,
		  body: JSON.stringify(eliminar),
		  headers: {
			'Content-Type': 'application/json',
		  },
		});
		await getInfoAPI();
	  };
    
	useEffect (() => {
		getInfoAPI()

	}, []);

	return (
	  <> <div className="List__container">
		<h3>ArtistAs pendientes:</h3>
		<div className="Input__container">
		<input placeholder="Task"
		  value={thing}
		  onChange={e => setThing(e.target.value)}
		/>
		<button className="button-add" onClick={() => {
		  createNewTodo(thing); setThing("");
		}}>Add</button>
		</div>
		
		<ul> 
		  {pends.map((p, index) => (
			<li key={index}>{p.label}{' '}
			<button className="button-delete" onClick={() => {
             deleteTask(p)
            }}>
              X
            </button>
			</li>
		  ))}
		</ul>
		<p> {pends.length} artistAs pendientes por descubrir</p>
		</div>
	  </>
	);
  }

export default Home;
