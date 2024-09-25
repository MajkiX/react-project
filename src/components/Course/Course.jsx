import React, { useContext } from 'react';
import bemCssModules from 'bem-css-modules'
import { default as CourseStyles } from './Course.module.scss'
import request from '../../helpers/request';
import { StoreContext } from '../../store/StoreProvider';
import { useNavigate } from 'react-router';

const style = bemCssModules(CourseStyles)

const Course = ({ authors, id, isUserContext, img, price, title }) => {

  const { user, setUser } = useContext(StoreContext)
  const history = useNavigate()

  const allAuthors = authors.join(', ')

  const isUserLogged = Boolean(user)

  const handleOnClick = async () => {
    try {
      const { data, status } = await request.patch(
        '/users',
        {
          login: user.login,
          courseId: id,
        }
      )
      if (status === 202) {
        setUser(data.user)
        history('my-courses')
      }
    } catch (error) {
      console.warn(error)
    }
  }

  const shouldBeBoyButtonVisible = isUserLogged && !isUserContext

  return (
    <li>
      <article className={style()}>
        <h3 className={style('title')}>{title}</h3>
        <img src={img} alt={title} className={style('image')} />
        <p className={style('price')}>{`Koszt kursu: ${price}zł`}</p>
        <p className={style('authors')}>{`Autorzy kursu: ${allAuthors}`}</p>
        {shouldBeBoyButtonVisible && <button onClick={handleOnClick}>Zakup ten kurs</button>}
      </article>
    </li>
  );
}

export default Course;