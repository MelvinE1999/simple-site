import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import tea from './cup-829527_640.jpg'
import { useEffect, useState} from 'react';
import CardSubtitle from 'react-bootstrap/esm/CardSubtitle';
function App() {
  return (
    <>
    <div class="row p-2 m-2 d-flex justify-content-center " >
      <TeaImage />
    </div>
    <div class=" d-flex justify-content-center row p-4 m-4">
      <SyncedListAndInfo />
    </div>
    </>
  );
}

function SyncedListAndInfo(){
  const [selectedTea, setSelectedTea] = useState('Black Tea')

  function changeTea(event){
    setSelectedTea(event.target.attributes.value.value)
  }

  return (
    <>
      <LiGroup 
        val={selectedTea}
        onChange={changeTea}  
      />
      <BodyCard 
        val={selectedTea}
        onChange={changeTea}
      />
    </>
  )
}


function TeaImage(){
  return (
    <Image src={tea} className='img-thumbnail w-25' />
  )
}

export function BodyCard({val, onChange}){
  const [cardInfo, setCardInfo] = useState({})
  useEffect(() => {
    async function getCardInfo() {
      const response = await fetch('http://127.0.0.1:8000/getTeaInfo/' + val)

      const data = await response.json()
      setCardInfo(data)

    }
    getCardInfo()
  })
  return (
    <>
      <Card bg="light" border="dark" style={{ height: '15rem' , width:'30rem'}}>
        <Card.Header>{val}</Card.Header>
        <Card.Body>
          <CardSubtitle>Water Temprature:</CardSubtitle>
          <Card.Text>
            {cardInfo["water"]}
          </Card.Text>
          <CardSubtitle>Tea Amount:</CardSubtitle>
          <Card.Text>
            {cardInfo["teaAmount"]}
          </Card.Text>
          <CardSubtitle>Steep Time:</CardSubtitle>
          <Card.Text>
            {cardInfo["steep"]}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}


function LiGroup({val, onChange}) {
  const [teas, setTeas] = useState([])
  useEffect(()=>{
    async function getTeas(){
      const response = await fetch('http://127.0.0.1:8000/getTeas')

      const data = await response.json()
      setTeas(data.teas)

    }
    getTeas()
  }, [])
  const liTeas = teas.map((tea) => {
    return <ListGroup.Item className={
      val === tea 
      ? "list-group-item active" 
      : "list-group-item"}
      value={tea}
      key={tea}
      onClick={onChange}
      >{tea}</ListGroup.Item>;
  }); 
  return (
    <>
    <ListGroup style={{width:"30rem", height:"30rem"}}>
      {liTeas}
    </ListGroup>
    </>
  );
}


export default App;
