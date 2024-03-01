import { useState } from "react"


const InitialFriend = [
  // {
  //   id: 1,
  //   name: 'Shehzad',
  //   image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnth5-wQ3awrdVlDxI3cZO1tewLa37xD-MjQ&usqp=CAU',
  //   balance: -7
  // },
  // {
  //   id: 2,
  //   name: 'Aman',
  //   image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnth5-wQ3awrdVlDxI3cZO1tewLa37xD-MjQ&usqp=CAU',
  //   balance: 70
  // },
  // {
  //   id: 3,
  //   name: 'Rizwan',
  //   image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnth5-wQ3awrdVlDxI3cZO1tewLa37xD-MjQ&usqp=CAU',
  //   balance: 0
  // }

]


function App(){
  const [showAddfriend,setshowAddfriend] = useState(false)
const [friend,setfriend] = useState(InitialFriend)
const [split ,setSplit] = useState(false)
const [bill, setBill] = useState()
const [expense, setExpense] = useState()
const [whosepayingbill , setWhosepayingbill] = useState()



function HandleShowAddFriend(){
  setshowAddfriend(!showAddfriend)
}

function HandleSelect(friend){
  setSplit(friend)
  setshowAddfriend(false)
}

  return(
    <div className="App">
      <div className="sidebar">
        <Friendlist friend={friend} bill={bill} setBill={setBill} expense={expense} setExpense={setExpense} split={split} setSplit={setSplit} onSelect={HandleSelect} whosepayingbill={whosepayingbill} setWhosepayingbill={setWhosepayingbill}/>
        {showAddfriend &&  <Formaddfriend friend={friend} setfriend={setfriend} showAddfriend={showAddfriend} setshowAddfriend={setshowAddfriend} whosepayingbill={whosepayingbill} setWhosepayingbill={setWhosepayingbill}/>}
        <button onClick={HandleShowAddFriend} className="btnform">{showAddfriend === true ? 'close' : 'Add friend'}</button>
    </div>
{ split && <Formsplitbill  friend={friend} setfriend={setfriend} onSelect={split}  split={split} setSplit={setSplit} bill={bill} setBill={setBill} expense={expense} setExpense={setExpense} whosepayingbill={whosepayingbill} setWhosepayingbill={setWhosepayingbill} />   }  

 </div>

  )
}

function Friendlist({friend , split, setSplit, onSelect, whosepayingbill, setWhosepayingbill, bill,setBill,expense,setExpense}){
  return(
<ul>
{friend.map((friend) => <Friend friend={friend} bill={bill} setBill={setBill} expense={expense} setExpense={setExpense} key={friend.id} split={split} setSplit={setSplit} onSelect={onSelect} whosepayingbill={whosepayingbill} setWhosepayingbill={setWhosepayingbill}/>)}
</ul>
  )
}


function Friend({friend, onSelect, split, setSplit, whosepayingbill, setWhosepayingbill,bill,setBill,expense,setExpense}){
return(
<li style={{listStyle: 'none', display:'flex', alignItems: 'center', gap: '2rem',}}>
  <img width={50} height={40} src={friend.image} alt="" style={{borderRadius: '50%'}} />
  <div style={{lineHeight:'10px',  width:'200px'}}>
  <h3>{friend.name}</h3>
  {friend.balance === 0 ? <p>You and {friend.name} are even</p> : ''}
  {friend.balance < 0 ? <p className="red"> You owe {friend.name} {Math.abs(friend.balance)}</p> : ''}
  {friend.balance > 0 ? <p className="green">{friend.name} owes you {friend.balance}</p> : ''}
  </div>
  <button  onClick={() => onSelect(friend)} className="btn">{friend.id === split.id ? 'Close' : 'Select'}</button>
</li>
)
}

function Formaddfriend({friend,setfriend,showAddfriend,setshowAddfriend,whosepayingbill}){
  const [name,setname] = useState()
  const [image,setimage] = useState()
  const mereItem =[...friend]
function HandleAddFriend(){
  const friend = {
    id: crypto.randomUUID(),
    name,
    image,
    balance: 0
  }

  mereItem.push(friend)
  setfriend(mereItem)
  setshowAddfriend(!showAddfriend)


}


  return(
    <div style={{backgroundColor:'#fcf2e0', width: '330px', padding: '1rem', lineHeight: '3rem',marginLeft: '2rem'}}>
  <div>
   <label style={{marginLeft: '1rem'}}>👩‍🚒 Friend Name</label>
  <input onChange={(e) => setname(e.target.value)} style={{marginLeft: '1rem', outline: 'none', padding: '5px'}} type="text" />
  </div>

<div>
<label style={{marginLeft: '1rem'}}>🔆 Image URL</label>
  <input onChange={(e) => setimage(e.target.value)} style={{marginLeft: '1.3rem', outline: 'none', padding: '5px'}} type="text" />
  <button onClick={HandleAddFriend} className="btnAdd">Add</button>

</div>

    </div>

  )
}

function Formsplitbill({onSelect, friend, setfriend, split , setSplit, bill, setBill, expense, setExpense, whosepayingbill, setWhosepayingbill}){
  const Difference = bill - expense
  

  function SplitHandler(){

if(!bill || !expense){
  return alert('Please enter bill and expense')
}

whosepayingbill === 'You'? onSelect.balance = Difference  : onSelect.balance = Difference
whosepayingbill === onSelect.name ? onSelect.balance = -expense : onSelect.balance = Difference

setfriend([...friend])
setSplit(!split)


  }

   
   




  return(
    <div style={{display:'flex', flexDirection:'column', backgroundColor:'#fcf2e0', width: '330px', padding: '2rem', lineHeight: '2rem'}}>
        <h2> Split A Bill With {onSelect.name}</h2>
 
 <label>💸 Bill value</label>
 <input onChange={(e) => setBill(Number(e.target.value))} style={{padding: '5px', outline: 'none',}} type="number"/>

 <label>👲 Your Expense</label>
 <input onChange={(e) => setExpense(Number(e.target.value))} style={{padding: '5px', outline: 'none',}} type="number"/>

 <label>👦 {onSelect.name} Expense</label>
 <input disabled value={Difference} style={{padding: '5px', outline: 'none',}} type="number"/>

<label>👳‍♂️ Who Is paying the bill</label>
<select onChange={(e) => setWhosepayingbill(e.target.value)} style={{padding: '5px', outline: 'none',}}>
  <option>You</option>
  <option>{onSelect.name}</option>
</select>
<button onClick={SplitHandler} style={{marginTop: '2rem'}} className="btn">Split bill</button>
    </div>
  )
}


export default App