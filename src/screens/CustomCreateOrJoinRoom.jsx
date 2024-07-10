import React from 'react'
import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { usePlayersList, useIsHost } from 'playroomkit'



const CustomCreateOrJoinRoom = () => {
    
        const navigate = useNavigate()
        const currentURL = window.location.href;
        const players = usePlayersList(false);
        const isHost = useIsHost();
        //const [name, setName] = usePlayerState(player, 'name', any)

        

        
       useEffect(() => {
        const playerNames = players.forEach(player => 
            player.getProfile().name);
         console.log("players who have joined: ", playerNames);
         
         
       
         
       }, [players])
       

    
       const handleRoomCreation = () => {
        // Logic to create or join a room
        // On success:
        navigate('/game/new'); // Adjust the path as necessary
      };

        const handleCopyUrl = () => {
            navigator.clipboard.writeText(currentURL)
                .then(() => {
                    alert('Copied!');
                })
                .catch(err => {
                    console.error('Failed to copy: ', err);
                });
        };

        
    
    


    return (
        
        <div class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full w-full ">
           <div class="h-screen w-screen flex justify-center items-center">
                <div class="flex flex-row justify-center items-center">
                    <div class="box-border h-64 w-64 p-4 border-4 bg-slate-700 m-10 rounded-md ">
                        <p class="flex justify-center text-white text-4xl"> 
                            {isHost?"Player X" : "Player O"}
                        </p>
                        <div class="flex justify-center box-border h-32 w-32 rounded-full bg-white ml-11 mt-8"></div>
                    </div>
            
            <div class=" flex flex-col justify-center">
                    <div >
                        <button onClick={handleCopyUrl} data-copy-to-clipboard-target={currentURL} class="font-sans  text-m font-bold bg-white text-black drop-shadow-xl rounded-full p-5 hover:bg-purple-300 ">Click to Copy!</button>
                    </div>
                    <div>
                    <button onClick={handleRoomCreation} data-copy-to-clipboard-target={currentURL} class="font-sans  text-s font-bold bg-black text-white drop-shadow-xl w-20 rounded-xl p-2 hover:bg-purple-300 m-8" bor>Start</button>

                    </div>
            </div>
                </div>
            </div>
        </div>
        

  )
}

export default CustomCreateOrJoinRoom