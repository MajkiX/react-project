import React, { useContext, useState } from 'react';
import bemCssModules from 'bem-css-modules'
import { default as CoursePopupStyles } from './CoursePopup.module.scss'
import { StoreContext } from '../../../store/StoreProvider';

import Modal from '../../Modal/Modal'
import request from '../../../helpers/request';

const style = bemCssModules(CoursePopupStyles)

const CoursePopup = ({
  authors = [],
  hidePopup,
  isEditMode = true,
  isOpenPopup,
  id,
  img = '',
  price = 0,
  title = ''
}) => {

  const [formAuthors, setFormAuthors] = useState(authors)
  const [formAuthor, setAuthor] = useState('')
  const [formImg, setFormImg] = useState(img)
  const [formPrice, setFormPrice] = useState(price)
  const [formTitle, setFormTitle] = useState(title)

  const { setCourses } = useContext(StoreContext)

  const handleOnChangeAuthor = event => setAuthor(event.target.value)
  const handleOnChangeImg = event => setFormImg(event.target.value)
  const handleOnChangePrice = event => setFormPrice(event.target.value)
  const handleOnChangeTitle = event => setFormTitle(event.target.value)

  const handleOnSubmit = async event => {
    event.preventDefault()

    const courseObject = {
      authors: formAuthors,
      id,
      img: formImg,
      price: Number(formPrice),
      title: formTitle,
    }

    if (isEditMode) {

      const { data, status } = await request.put('/courses', courseObject)


      if (status === 202) {
        setCourses(data.courses)
      }
    } else {
      const { data, status } = await request.post('/courses', courseObject)

      if (status === 201) {
        setCourses(data.courses)
      }
    }

    hidePopup()
  }

  const addAuthor = event => {
    event.preventDefault()

    setFormAuthors(prev => [...prev, formAuthor])
    setAuthor('')
  }

  const deleteAuthor = event => {
    const authorToDelete = event.target.dataset.author
    setFormAuthors(prev => prev.filter(author => author !== authorToDelete))
  }

  const authorsElements = formAuthors.map(author => (
    <li key={author}>
      <p>{author}</p>
      <button data-author={author} onClick={deleteAuthor}>Usuń</button>
    </li>
  ))

  const correctLabel = isEditMode ? 'aktualizuj kurs' : 'utwórz kurs'

  return (
    <Modal handleOnClose={hidePopup} isOpen={isOpenPopup}>
      <div className={style()}>
        <form className={style('form')} method='submit' onSubmit={handleOnSubmit}>
          <div className={style('form-row')}>
            <label>
              Autor:
              <input type='text' className={style('input')} onChange={handleOnChangeAuthor} value={formAuthor} />
              <button onClick={addAuthor}>Dodaj autora</button>
            </label>
          </div>
          <div className={style('form-row')}>
            <label>
              Obrazek url:
              <input type='text' className={style('input')} onChange={handleOnChangeImg} value={formImg} />
            </label>
          </div>
          <div className={style('form-row')}>
            <label>
              Cena:
              <input type='number' className={style('input')} onChange={handleOnChangePrice} value={formPrice} />
            </label>
          </div>
          <div className={style('form-row')}>
            <label>
              Tytuł:
              <input type='text' className={style('input')} onChange={handleOnChangeTitle} value={formTitle} />
            </label>
          </div>
          <button type='submit'>{correctLabel}</button>
          <button onClick={hidePopup} type='button'>Anuluj</button>
        </form>
        <p>Lista autorów</p>
        <ul>
          {authorsElements}
        </ul>
      </div>
    </Modal>
  );
}

export default CoursePopup;