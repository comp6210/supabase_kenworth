import { useState, useEffect } from 'react';
import supabase from './supabaseClient';

function CRUD() {
  const [trucks, setTrucks] = useState([]);
  const [form, setForm] = useState({ model: '', title: '', tagline: '', image: '', content: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTrucks();
  }, []);

  const fetchTrucks = async () => {
    const { data, error } = await supabase.from('kenworth').select('*');
    if (error) {
      console.error('Error fetching trucks:', error);
    } else {
      setTrucks(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await supabase.from('kenworth').update(form).eq('id', editingId);
    } else {
      await supabase.from('kenworth').insert([form]);
    }
    fetchTrucks();
    setForm({ model: '', title: '', tagline: '', image: '', content: '' });
    setEditingId(null);
  };

  const handleEdit = (truck) => {
    setForm(truck);
    setEditingId(truck.id);
  };

  const handleDelete = async (id) => {
    await supabase.from('kenworth').delete().eq('id', id);
    fetchTrucks();
  };
 
  return (
   <div>
    <h4 className='display-4'>Add new Kenworth</h4>
    <form onSubmit={handleSubmit} className='form-group'>
    <input
          type="text"
          placeholder="Model"
          value={form.model}
          onChange={(e) => setForm({ ...form, model: e.target.value })}
          required
          className='form-control p-3 mb-3'
        />
    <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          className='form-control p-3 mb-3'
        />
    <input
          type="text"
          placeholder="Tagline"
          value={form.tagline}
          onChange={(e) => setForm({ ...form, tagline: e.target.value })}
          required
          className='form-control p-3 mb-3'
        />
    <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className='form-control p-3 mb-3'
        />
    <textarea
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          required
          className='form-control p-3 mb-3'
        />
    <button type="submit" className='btn btn-primary mb-3'>{editingId ? 'Update' : 'Create'}</button>
    </form>

      

      <div className='p-3 border rounded shadow'>
      <h1>Record Admin</h1>
       <ul>
         {trucks.map((truck) => (
           <li key={truck.id} className='p-1'>
              {truck.model} - {truck.title} {" "}
             <button onClick={() => handleEdit(truck)} className='btn btn-warning btn-small'>Edit</button>{" "}
             <button onClick={() => handleDelete(truck.id)} className='btn btn-danger btn-small'>Delete</button>
           </li>
         ))}
       </ul>
       </div>

   </div>
  );
}

export default CRUD;
