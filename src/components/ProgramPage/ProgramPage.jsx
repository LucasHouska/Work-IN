import {useState} from 'react';

import ProgramForm from "../ProgramForm/ProgramForm";
import ProgramList from "../ProgramList/ProgramList";


function ProgramPage() {

    const [programDay, setProgramDay] = useState(1)


    return (
        <>

            <ProgramForm programDay={programDay} setProgramDay={setProgramDay}/>
            <ProgramList programDay={programDay} setProgramDay={setProgramDay}/>
        </>
    )
}

export default ProgramPage;