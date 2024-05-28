import {useState, useEffect} from 'react';
import supabase from './supabaseClient';

function FrontPage()
{
    const [models, setModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState(null);

    useEffect(
    ()=> {
        fetchModels();
    }, []
    );

    // this fetches all records based on the model field
    const fetchModels = async () => {
        // table name is kenworth field name is model, change these appropriately to suit your table setup
        const {data, error} = await supabase.from('kenworth').select('model');
        if(error){
            console.error("Error fetching models: ", error)
        }else{
            setModels(data);
        }
    };

   // This fetches entire record based on model that has been clicked.
    const fetchModelDetails = async (model) => {
        const {data, error} = await supabase.from('kenworth').select('*').eq('model', model).single();
        if(error){
            console.error("Error fetching record: ", error)
        }else{
            setSelectedModel(data);
        }
    };
    
    return(
        <>
            <div className='mb-3 shadow'>
                <nav>
                    <ul className='list-group'>
                        {
                            models.map(
                                (item)=>(
                                    <li key={item.model} onClick={()=>fetchModelDetails(item.model)} className='list-group-item list-group-item-action list-group-item-dark'>
                                        {item.model}
                                    </li>
                                )
                            )
                        }
                    </ul>
                </nav>
            </div>

            {
                selectedModel && (
                    <div>
                        <h1>{selectedModel.model}</h1>
                        <h2>{selectedModel.title}</h2>
                        <h3>{selectedModel.tagline}</h3>
                        <p className='text-center'><img src={selectedModel.image} alt={selectedModel.model} className='img-fluid' /></p>
                        <p>{selectedModel.content}</p>
                    </div>
                )
            }
            <hr />
        </>
    )
}

export default FrontPage;