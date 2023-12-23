import createStudentService from "./services/students-service"
import './App.css'




function App() {

  const StudentService = createStudentService()

  const {request} = StudentService.getAll()

  request
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })


  return (
    <div className="App">
      <h1>OK</h1>
    </div>
  )
}

export default App
