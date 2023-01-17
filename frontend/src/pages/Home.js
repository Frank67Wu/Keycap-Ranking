import SplitPane from '../components/SplitPane'
import { useEffect, useState } from 'react'


const Home = () => {

    const [leftText, setLeftText] = useState('lorum ipsum')
    const [rightText, setRightText] = useState('lorum ipsum')
    const [leftImage, setleftImage] = useState('../assets/4x.png')
    const [rightImage, setrightImage] = useState('4x.png')
    const [colourOne, setColourOne] = useState('#f6f5f5')
    const [colourTwo, setColourTwo] = useState('#b7e0ee')
    const [colourThree, setColourThree] = useState('#4b4c4c')
    
    const kFactor = 20

    useEffect(() => {
        const fetchRandom = async () => {
            const [responseOne, responseTwo] = await Promise.all([fetch('http://localhost:4000/api/keycaps/random'), fetch('http://localhost:4000/api/keycaps/random')])
            const [jsonOne, jsonTwo] = await Promise.all([responseOne.json(), responseTwo.json()])
            setLeftText(jsonOne.name)
            setRightText(jsonTwo.name)
        }

        fetchRandom()
    }, [])

    // chess elo function to calculate win rate (not directly used)
    const expectedWin = (objectOneElo, objectTwoElo) => {
        return 1/(1 + Math.pow(10,((objectTwoElo - objectOneElo)/400)))
    }

    // Change in points using chess elo 
    const eloChange = (objectOne, objectTwo, outcome) => {
        return kFactor * (outcome - expectedWin(objectOne, objectTwo))
    }

    // update both Elos, outcome is with regards to the first elo i.e 1 if eloOne won
    const updateElos = ([elo], outcome) => {
        const eloChangeOne = eloChange(elo[0], elo[1], outcome)
        const eloChangeTwo = eloChange(elo[1], elo[0], 1 - outcome)
        elo[0] = elo[0] + eloChangeOne
        elo[1] = elo[1] + eloChangeTwo
    }


    return (
        <div className="home">
            <SplitPane children={{text:leftText, image:leftImage}} c1={colourOne} c2={colourTwo} c3={colourThree} width={'50vw'} height={'100vh'}/>
            <SplitPane children={{text:rightText, image:rightImage}} c1={colourOne} c2={colourTwo} c3={colourThree} width={'50vw'} height={'100vh'}/>
        </div>

    )
}

export default Home