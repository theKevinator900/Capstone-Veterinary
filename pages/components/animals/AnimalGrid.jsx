import React, { useState } from 'react';
import {
  Button,
  Icon,
  Dropdown,
  Container,
  Grid,
  Pagination,
  Modal,
} from 'semantic-ui-react';
import AnimalCard from './AnimalCard';
import AddAnimalModal from './AddAnimalModal';

const AnimalGrid = ({ animals, isAdmin }) => {
  const [currPage, setCurrPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handlePageChange = (e, data) => {
    setCurrPage(data.activePage);
  };

  const typeOptions = [
    {
      text: 'Any Type',
      value: 'any',
    },
    {
      text: 'Dog',
      value: 'dog',
    },
    {
      text: 'Cat',
      value: 'cat',
    },
  ];

  const ageOptions = [
    {
      text: 'Any Age',
      value: 'any',
    },
    {
      text: 'Young',
      value: 'young',
    },
    {
      text: 'Adult',
      value: 'adult',
    },
    {
      text: 'Senior',
      value: 'senior',
    }
  ];

  const ageRanges = {
    young: [0, 2],
    mid: [2, 5],
    adult: [5, 10],
    senior: [10, 999],
  };

  const genderOptions = [
    {
      text: 'Any Gender',
      value: 'any',
    },
    {
      text: 'Male',
      value: 'male',
    },
    {
      text: 'Female',
      value: 'female',
    },
  ];

  const [filterObj, setFilterObj] = useState({
    type: 'any',
    age: 'any',
    gender: 'any',
  });

  const [filteredAnimals, setFilteredAnimals] = useState(animals);

  const handleChange = (_, data) => {
    const { name, value } = data;
    const newFilterObj = { ...filterObj, [name]: value };
    setFilterObj(newFilterObj);
    filterResults(newFilterObj);
    setCurrPage(1);
  };

  const filterResults = (obj) => {
    setFilteredAnimals(animals);

    const { type, gender, age } = obj;
    if (type !== 'any') {
      setFilteredAnimals((prev) =>
        prev.filter((animal) => animal.type === type)
      );
    }
    if (gender !== 'any') {
      setFilteredAnimals((prev) =>
        prev.filter((animal) => animal.gender === gender)
      );
    }
    if (age !== 'any') {
      setFilteredAnimals((prev) => prev.filter((animal) => animal.age === age));
    }
  };

  return (
    <>
      {isAdmin && (
        <Button disabled={loading} onClick={() => setShowModal(true)}>
          <Icon name='plus' />
          Add Animal
        </Button>
      )}
      {showModal && (
        <Modal
          id='add-animal'
          open={showModal}
          closeIcon
          closeOnDimmerClick
          onClose={() => setShowModal(false)}
        >
          <Modal.Content>
            <AddAnimalModal
              setAnimals={setFilteredAnimals}
              setShowModal={setShowModal}
            />
          </Modal.Content>
        </Modal>
      )}

      <div className='sort-div'>
        <Dropdown
          placeholder='Type'
          name='type'
          selection
          options={typeOptions}
          onChange={handleChange}
          value={filterObj.type}
        />
        <Dropdown
          placeholder='Gender'
          name='gender'
          selection
          options={genderOptions}
          onChange={handleChange}
          value={filterObj.gender}
        />
        <Dropdown
          placeholder='Age'
          name='age'
          selection
          options={ageOptions}
          onChange={handleChange}
          value={filterObj.age}
        />
      </div>

      {filteredAnimals.length > 0 ? (
        <Container fluid className='animal-list'>
          <Grid columns='3' centered relaxed>
            {filteredAnimals
              .slice((currPage - 1) * 6, currPage * 6)
              .map((animal, index) => {
                // console.log(animal);
                const { name, age, type, gender, picURLs, _id } = animal;

                return (
                  <AnimalCard
                    name={name}
                    age={age}
                    type={type}
                    picURLs={picURLs}
                    id={_id}
                    gender={gender}
                    key={_id}
                  />
                );
              })}
          </Grid>
        </Container>
      ) : (
        <>
          {!animals.length ? (
            <div className='no-animals'>
              There are currently no animal adoptions posted.{' '}
              {isAdmin ? 'Start by adding one' : 'Come back later.'}
            </div>
          ) : (
            <div className='no-animals'>
              There are no animals matching that description.
            </div>
          )}
        </>
      )}
      <Pagination
        onPageChange={handlePageChange}
        activePage={currPage}
        totalPages={Math.ceil(filteredAnimals.length / 6)}
        firstItem={null}
        lastItem={null}
        role='link'
      />
    </>
  );
};

export default AnimalGrid;
