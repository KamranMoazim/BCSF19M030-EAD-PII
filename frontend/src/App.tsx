import createStudentService from "./services/students-service"
import './App.css'
import Sidebar from "./components/Sidebar"




function App() {

  const StudentService = createStudentService()

  // const {request} = StudentService.getAll()

  // request
  // .then((res) => {
  //   console.log(res)
  // })
  // .catch((err) => {
  //   console.log(err)
  // })

  // const k = StudentService.getAgeDistribution()

  // k.request
  // .then((res) => {
  //   console.log(res.data)
  // })
  // .catch((err) => {
  //   console.log(err)
  // })


  // const kk = StudentService.getGenderDistribution()

  // kk.request
  // .then((res) => {
  //   console.log(res.data)
  // })
  // .catch((err) => {
  //   console.log(err)
  // })

  // const kkk = StudentService.getDegreeDistribution()

  // kkk.request
  // .then((res) => {
  //   console.log(res.data)
  // })
  // .catch((err) => {
  //   console.log(err)
  // })

  // const k = StudentService.getAllWithQuery({
  //   OrderBy:"fullName",
  //   OrderDirection:1,
  //   PageNumber:1,
  //   PageSize:1
  // })

  // k.request
  // .then((res) => {
  //   console.log(res)
  // })
  // .catch((err) => {
  //   console.log(err)
  // })

  return (
    <div className="App">
      <Sidebar />
    </div>
  )
}

export default App
