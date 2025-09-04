import { useLoaderData, useParams } from 'react-router-dom';

const Contact = () => {
    const FacultyData = useLoaderData()
    const {id}= useParams()
    const faculty=FacultyData.find((F)=> F.id === id) 
    
    return (
        <div>
            <h1>Contact</h1>
            <h1>ID:{id}</h1>
        </div>
    );
};

export default Contact;