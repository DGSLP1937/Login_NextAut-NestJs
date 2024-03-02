
//list.cats.tsx
import Table from 'react-bootstrap/Table';

interface Cat {
    idgato: string
    name: string
    username: string
    raza: {
        idraza: number
        name: string
    }
}

const ListCats = ( {catsData } ) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Raza</th>
          <th>Usuario</th>
        </tr>
      </thead>
      <tbody>
        {catsData.map((cat: Cat) => (
          <tr key={cat.idgato}>
            <td>{cat.idgato}</td>
            <td>{cat.name}</td>
            <td>{cat.raza?.name}</td>
            <td>{cat.username}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ListCats;