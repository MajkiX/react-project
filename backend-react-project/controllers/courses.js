const { v4: uuid } = require('uuid');

const coursesData = [
  {
    authors: ['Jan Kowalski'],
    id: uuid(),
    img: 'https://ucarecdn.com/188949ff-9fe5-4e13-a682-f9a2cb4614fa/-/crop/1531x667/69,0/-/preview/-/resize/1050/',
    price: 69.99,
    title: 'Web developer od podstaw',
  },
  {
    authors: ['Krystian Nowak'],
    id: uuid(),
    img: 'https://www.iflexion.com/sites/all/themes/iflexion/images/vis-frontend-1.png.pagespeed.ce.BaNjCRg5DI.png',
    price: 69.99,
    title: 'Zaawansowany front-end',
  },
  {
    authors: ['Janusz Kowalski'],
    id: uuid(),
    img: 'https://media.licdn.com/dms/image/D4E12AQFfe1nZbaWdMw/article-cover_image-shrink_720_1280/0/1698604163003?e=2147483647&v=beta&t=rtD52hfy37nFVmc4_MXfnflV6C-ke773W70SYJLoWRc',
    price: 69.99,
    title: 'Programowanie w JavaScript',
  },
  {
    authors: ['Jan Kowalski', 'Zbigniew Romanowski'],
    id: uuid(),
    img: 'https://rossmann.tech/files/reactjs.webp',
    price: 69.99,
    title: 'React od podstaw',
  },
  {
    authors: ['Ryszard Lipa'],
    id: uuid(),
    img: 'https://bs-uploads.toptal.io/blackfish-uploads/components/open_graph_image/8959179/og_image/optimized/0712-Bad_Practices_in_Database_Design_-_Are_You_Making_These_Mistakes_Dan_Social-754bc73011e057dc76e55a44a954e0c3.png',
    price: 69.99,
    title: 'Node.js, Express i MongoDB',
  },
  {
    authors: ['Konrad Michałowski'],
    id: uuid(),
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAr49hbLpWayHG6WfN1sE1oNOC-2zAtfaVHw&s',
    price: 69.99,
    title: '(Zaawansowane) Projekty w CSS i JavaScript',
  },
  {
    authors: ['Patryk Bielak'],
    id: uuid(),
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdd25hyNQOMs4Xx1Cv_A_oaT0zagfSWlXMBA&s',
    price: 0,
    title: 'Wprowadzenie do Gita',
  },
  {
    authors: ['Patryk Bielak', 'Mateusz Kowalewski', 'Jan Nowak', 'Kacper Karmowski'],
    id: uuid(),
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJA6UFV6kBwQkGnmhpKTjNlTnO2WTq9WdjxA&s',
    price: 69.99,
    title: 'Programowanie obiektowe w JavaScript'
  }
];

exports.getCourses = (request, response, next) => {
  try {
    response.status(200).json({
      courses: coursesData
    });
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Oops! Coś poszło nie tak, przy metodzie GET w endpointcie /courses',
    });
  }
};

exports.getCourse = (request, response, next) => {
  try {
    const { id } = request.params;
    const courseToSend = coursesData.find(course => course.id === id);

    if (!courseToSend) {
      response.status(404).json({
        message: 'Nie znaleziono kursu o podanym id',
      });
      
      return;
    }

    response.status(200).json({
      course: courseToSend, 
    });
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Oops! Coś poszło nie tak, przy metodzie GET w endpointcie /courses/:id',
    })
  }
};

exports.postCourse = (request, response, next) => {
  try {
    const { authors, img, price, title } = request.body;
    if ( !authors || !price || !title ) {
      response.status(400).json({
        message: 'Nie podano wszystkich wymaganych informacji',
      });

      return;
    }

    const isCourseExist = coursesData.some(({title: currentTitle}) => currentTitle === title);
    if (isCourseExist) {
      response.status(409).json({
        message: `Istnieje już w bazie kurs ${title}`,
      });

      return;
    }

    const newCourse = {
      authors: authors,
      id: uuid(),
      img,
      price,
      title,
    };

    coursesData.push(newCourse);

    response.status(201).json({
      courses: coursesData
    });
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Oops! Coś poszło nie tak, przy metodzie POST w endpointcie /courses'
    });
  }
};

exports.putCourse = (request, response, next) => {
  try {
    const { authors, id, price, title } = request.body;
    if (!authors || !id || !price || !title) {
      response.status(400).json({
        message: 'Nie podano wszystkich wymaganych informacji',
      });

      return;
    }

    const indexCourseToUpdate = coursesData.findIndex(course => course.id === id);
    if (indexCourseToUpdate === -1) {
      response.status(404).json({
        message: 'Nie znaleziono kursu o podanym id',
      });
      
      return;
    }
    
    
    coursesData.splice(indexCourseToUpdate, 1, request.body);

    response.status(202).json({
      courses: coursesData
    });
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Oops! Coś poszło nie tak, przy metodzie PUT w endpointcie /courses'
    });
  }
};

exports.deleteCourse = (request, response, next) => {
  try {
    const { id } = request.params;

    console.log(id);
    const indexCourseToDelete = coursesData.findIndex(course => course.id === id);

    if (indexCourseToDelete === -1) {
      response.status(404).json({
        message: 'Nie znaleziono kursu o podanym id',
      });
      
      return;
    }

    coursesData.splice(indexCourseToDelete, 1);
    response.status(200).end();
  } catch (error) {
    response.status(500).json({
      error,
      message: 'Oops! Coś poszło nie tak, przy metodzie DELETE w endpointcie /courses/:id',
    });
  }
};

exports.coursesData = coursesData;