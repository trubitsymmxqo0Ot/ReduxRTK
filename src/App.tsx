import { useEffect } from 'react';
import './App.css'
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { userSlice } from './store/reducers/UseSlice'
import { fetchUsers } from './store/reducers/fetchUsers';

function App() {
  const {increment} = userSlice.actions; //Получаем action creator, которые передают данные в state в зависимости от действий пользователя
  const {count} = useAppSelector(state => state.userReducer);
  const dispatch = useAppDispatch();
  const {user, isLoading, error} = useAppSelector(state => state.userReducer);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [])
  return (
    <>
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment(10))}>increment</button>
      <div>
        {isLoading && <p>Идет загркузка...</p>}
        {error && <p>Ошибка: {error}</p>}
        {user.map((item) => (
          <div key={item.id}>
            <div>{item.name}</div>
            <div>{item.email}</div>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default App
