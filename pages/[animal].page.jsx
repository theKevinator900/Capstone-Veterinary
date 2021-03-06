import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseURL } from "./util/auth";
import { useRouter } from "next/router";
import { deleteAnimal } from "./util/animalActions";
import Link from 'next/link'
import {
  Grid,
  Icon,
  Image,
  Button,
  Modal,
  Header,
  Popup,
} from "semantic-ui-react";
import ImageModal from "./components/layout/ImageModal";
import AdoptAnimalModal from "./components/animals/AdoptAnimalModal";
import EditAnimalModal from "./components/animals/EditAnimalModal";

const Animal = ({ user, animalObj, errorLoading, animals }) => {
  const router = useRouter();

  const [allAnimals, setAnimals] = useState(animals);
  const [showModal, setShowModal] = useState(false);

  const [showImageModal, setShowImageModal] = useState(false);
  const [showImage, setShowImage] = useState(null);

  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    if (errorLoading !== null) {
      router.push("/");
    }
  }, [errorLoading, router]);

  const handleKeyPress = (e, pic) => {
    const { code } = e;
    if (code === "Enter") {
      setShowImage(pic);
      setShowImageModal(true);
    }
  };

  return (
    <div>
      {showImageModal && (
        <Modal
          open={showImageModal}
          // icon={{
          //   tabIndex: 0,
          //   name: "close",
          //   onClick: setShowImageModal(false),
          // }}
          id="image-modal"
          closeIcon
          closeOnDimmerClick
          onClose={() => setShowImageModal(false)}
        >
          <Modal.Content>
            <ImageModal image={showImage} />
          </Modal.Content>
        </Modal>
      )}
      {showEdit && (
        <Modal
          id="edit-animal"
          open={showEdit}
          closeIcon
          closeOnDimmerClick
          onClose={() => setShowEdit(false)}
        >
          <Modal.Content>
            <EditAnimalModal
              animal={animalObj}
              setAnimals={setAnimals}
              setShowModal={setShowEdit}
            />
          </Modal.Content>
        </Modal>
      )}
      <div className="page-wrap">
        <div className="animal-wrap">
          <div
            className="top-btns"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            {user ? (
              <div
                onClick={() => router.push("/admin")}
                style={{ cursor: "pointer" }}
              >
                <Icon name="arrow left" />
                Back to Admin
              </div>
            ) : (
              <div style={{ cursor: "pointer" }}>
                <Icon name="arrow left" />
                {/* <a href="/animals">Back to Adoption</a> */}
                <Link href="/animals">Back to Adoption</Link>
              </div>
            )}
            {user && (
              <div>
                <Icon
                  circular
                  inverted
                  id="edit-1"
                  name="pencil alternate"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowEdit(true)}
                />
                <Popup
                  on="click"
                  position="top right"
                  className="delete-popup"
                  trigger={
                    <Icon
                      circular
                      inverted
                      id="edit-2"
                      color="red"
                      name="trash"
                      style={{ cursor: "pointer" }}
                    />
                  }
                >
                  <Header as="h4" content="Are you sure?" />
                  <p>This action is irreversable!</p>

                  <Button
                    color="red"
                    icon="trash"
                    content="Delete"
                    onClick={() => {
                      deleteAnimal(animalObj._id, setAnimals);
                      router.push("/admin");
                    }}
                  />
                </Popup>
              </div>
            )}
          </div>
          <h1 className="pet-name">{animalObj.name}</h1>
          <Image
            src={animalObj.picURLs[0]}
            alt={`${animalObj.name} image`}
            className="pet-img"
          />
          <div className="para-desc" style={{ flexDirection: "column" }}>
            {/* {user && <p>Added by {animalObj.user.name ? animalObj.user.name : "Admin"}</p>} */}
            <p>
              {animalObj.type} | {animalObj.gender} | {animalObj.age} |{" "}
              {animalObj.breed !== "unspecified" && `${animalObj.breed} | `}
              {animalObj.location} campus
            </p>
          </div>
          <h2 className="pet-title">About me!</h2>
          <div className="pet-description">
            <div className="section-1">
              {animalObj.desc && (
                <div>
                  <h3>Description</h3>
                  <p>{animalObj.desc}</p>
                </div>
              )}
              {animalObj.details && (
                <div>
                  <h3>Details</h3>
                  <p>{animalObj.details}</p>
                </div>
              )}
            </div>
            <div className="section-2">
              {animalObj.colors && (
                <div>
                  <h3>Color(s)</h3>
                  <p>{animalObj.colors}</p>
                </div>
              )}
              <div>
                <h3>Vaccinations Up To Date?</h3>
                <p>{animalObj.vaccs === true ? "Yes" : "No"}</p>
              </div>
            </div>
            <div className="section-3">
              <div>
                <h3>Neutered or Spayed?</h3>
                <p>{animalObj.neutered === true ? "Yes" : "No"}</p>
              </div>
              {animalObj.needs === true && (
                <div>
                  <h3>{animalObj.specialNeeds ? "Special Needs" : ""}</h3>
                  <p>{animalObj.specialNeeds}</p>
                </div>
              )}
            </div>
          </div>

          <h3 className="gallery-title">Gallery</h3>

          {animalObj.picURLs.length && (
            <Grid className="pet-gallery" style={{ display: "flex" }}>
              {animalObj.picURLs.map((pic, index) => {
                return (
                  <Image
                    tabIndex={0}
                    key={index}
                    style={{
                      width: "250px",
                      height: "auto",
                      cursor: "pointer",
                    }}
                    src={pic}
                    onKeyDown={(e) => handleKeyPress(e, pic)}
                    onClick={() => {
                      setShowImage(pic);
                      setShowImageModal(true);
                    }}
                    alt={`Gallery Img ${index}`}
                  />
                );
              })}
            </Grid>
          )}

          {animalObj.vidURLs.length !== 0 && (
            <>
              <h3 className="gallery-title" style={{marginTop: "4rem"}}>Videos</h3>
              <Grid className="pet-gallery" style={{ display: "flex" }}>
                {animalObj.vidURLs.map((vid, index) => {
                  return (
                    <video
                      tabIndex={0}
                      controls
                      key={index}
                      style={{ maxWidth: "250px", objectFit: "scale-down" }}
                    >
                      <source src={vid} key={index} />
                      Your browser does not support the video tag.
                    </video>
                  );
                })}
              </Grid>
            </>
          )}
          <Button
            id="interested-button"
            onClick={() => setShowModal(true)}
            content="Adopt"
            fluid
          />
          {showModal && (
            <Modal
              id="add-event"
              open={showModal}
              closeIcon
              closeOnDimmerClick
              onClose={() => setShowModal(false)}
            >
              <Modal.Content>
                <AdoptAnimalModal
                  setShowModal={setShowModal}
                  animalObj={animalObj}
                />
              </Modal.Content>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

Animal.getInitialProps = async (ctx) => {
  try {
    const { animal } = ctx.query;
    const res1 = await axios.get(`${baseURL}/api/v1/animal`); //GET ALL ANIMALS
    const animals = res1.data;
    // console.log(animals);

    const res2 = await axios.get(`${baseURL}/api/v1/animal/${animal}`); //GET ANIMAL
    const animalObj = res2.data;

    return { animalObj, errorLoading: null, animals };
  } catch (error) {
    console.log(error);
    return { errorLoading: error, animalObj: {}, animals: {} };
  }
};

export default Animal;
