import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom'
import { StarIcon } from '@heroicons/react/20/solid'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckCircleIcon, ExclamationTriangleIcon, CodeBracketIcon } from '@heroicons/react/24/outline'
import apiLearner from '../api/axiosLearnerConfig'
import apiCourse from '../api/axiosCourseConfig'
import { courses } from '../data/Courses'
import { useContext } from 'react'
import { ShopContext } from './shop-context'
import { PlayIcon } from "@heroicons/react/24/solid";
import ceo from '../assets/image/toan.jpg'
import { Disclosure, Menu } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import api from '../api/axiosAccountConfig'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon, ChevronUpIcon, ShareIcon, GiftIcon, ShoppingCartIcon, WalletIcon } from '@heroicons/react/20/solid'
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import { EditorState } from 'draft-js';
import { CLIENT_ID } from '../../config/Config'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";
import { LearnerContext } from '../../App'

const includes = [
  '15.5 hours on-demand video.',
  '1 article.',
  '6 downloadable resources',
  'Access on mobile and TV',
  'Certificate of completion',
]

const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

// create random string
function generateString(length) {
  const result = Math.random().toString(36).substring(2, length + 2)
  return result;
}

export default function CoursePreview(props) {
  const { getLearners } = useContext(LearnerContext);
  const navigate = useNavigate();
  const [send, setSend] = useState(false)
  //galgry
  const [activeVid, setActiveVid] = useState("https://www.youtube.com/embed/Sv5yCzPCkv8?si=ZwqYBwnWohqcAtWH")
  const [actTitle, setActTitle] = useState("SZA - Snooze");
  const [description, setActiveDescription] = useState("My favorite song from my celebrity crush")
  // cart
  const { addToCart, cartItems } = useContext(ShopContext);

  // const cartItemCount = cartItems[id];

  //---------
  // const [courses, setCourses] = useState()
  // const getCourses = async () => {
  //   try {
  //     const response = await apiCourse.get("/getCourses");
  //     setCourses(response.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // useEffect(() => {
  //   getCourses();
  // }, []
  // )
  const [learner, setLearner] = useState()
  const getLearner = async () => {
    try {
      const response = await apiLearner.get("/getLearners");
      setLearner(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getLearner();
  }, []
  )
  const [detail, setDetail] = useState(false)
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null)
  const thisAccount = JSON.parse(localStorage.getItem("logined"))
  const thisStudent = learner?.filter((learner) => learner.accountId === thisAccount?.id);
  const { id } = useParams()
  //const isExist = courses?.find((course) => String(course.id) === id)
  //get this course
  const formCourseData = new FormData();
  formCourseData.append('id', id);

  const [thisCourse, setThisCourse] = useState()
  const getThisCourse = async () => {
    try {
      const response = await apiCourse.post("/showSectionAndVideo", formCourseData);
      setThisCourse(response.data)
    } catch (e) {
      alert("no course")
    }
  }

  useEffect(() => {
    getThisCourse();
  }, [])
  const isLearn = thisStudent?.find((course) => course.courseId === thisCourse?.id)
  let price = '';

  if (thisCourse?.price > 0) {
    price = '$' + thisCourse?.price
  } else {
    price = 'Free'
  }
  const [status, setStatus] = useState(0)
  const formData = new FormData();
  formData.append('courseId', thisCourse?.id);
  formData.append('accountId', thisAccount?.id);
  formData.append('status', status);
  formData.append('senderId', thisAccount?.id);
  formData.append('message', '');
  async function enrollFree(e) {
    e.preventDefault();
    if (localStorage.getItem("STU-authenticated")) {
      try {
        await axios.post("http://localhost:8080/course/enrol", formData).then(response => {
          setOpen(true)
          getLearners()
        })
      } catch (err) {
        alert(err);
      }
    } else {
      navigate('/login')
    }
  }
  const [cart, setCart] = useState(false)
  const displayMessage = () => {

    if (thisCourse?.price > 0) {
      price = '$' + thisCourse?.price;
      if (isLearn) {
        return <> <Link to={`/learning/${id}`}> <button
          type="submit"
          //className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 ..."
          className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-purple-500 hover:bg-gray-300 duration-300 mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-200 px-8 py-3 text-base font-medium text-purple-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Go to course
        </button></Link>
          <div className="flex flex-row justify-center items-center mt-6">
            <hr className="border w-full" />
            <p className="flex flex-shrink-0 px-4 text-base leading-4 text-gray-600">or</p>
            <hr className="border w-full" />
          </div>
          <button onClick={() => setGift(true)}
            type="button"
            className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-purple-500 hover:bg-gray-300 duration-300 mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-purple-600 px-8 py-3 text-base font-medium text-white hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            <GiftIcon className='w-6 h-6 mr-4' />Gift this course
          </button></>
      } else {
        if (thisAccount?.roleId == 2 || thisAccount?.roleId == 4) {
          if (cartItems[thisCourse?.id] === undefined || cartItems[thisCourse?.id] === false) {
            return <><button
              onClick={() => {
                addToCart(parseInt(thisCourse?.id))
                setCart(true)
              }}
              type="button"
              className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-purple-500 hover:bg-gray-300 duration-300 mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-purple-600 px-8 py-3 text-base font-medium text-white hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              <ShoppingCartIcon className='w-6 h-6 mr-4' /> Add to cart
            </button>
              <button
                onClick={() => setShow(true)}
                type="button"
                className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-purple-500 hover:bg-gray-300 duration-300 mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-200 px-8 py-3 text-base font-medium text-purple-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                <WalletIcon className='w-6 h-6 mr-4' />Buy now
              </button>
              <div className="flex flex-row justify-center items-center mt-6">
                <hr className="border w-full" />
                <p className="flex flex-shrink-0 px-4 text-base leading-4 text-gray-600">or</p>
                <hr className="border w-full" />
              </div>
              <button onClick={() => setGift(true)}
                type="button"
                className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-purple-500 hover:bg-gray-300 duration-300 mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-purple-600 px-8 py-3 text-base font-medium text-white hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                <GiftIcon className='w-6 h-6 mr-4' />Gift this course
              </button></>
          } else {
            return <><button
              type="button"
              className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-purple-500 hover:bg-gray-300 duration-300 mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-200 px-8 py-3 text-base font-medium text-purple-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              <ShoppingCartIcon className='w-6 h-6 mr-4' />Go to cart
            </button>
              <button
                onClick={() => setShow(true)}
                type="button"
                className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-purple-500 hover:bg-gray-300 duration-300 mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-200 px-8 py-3 text-base font-medium text-purple-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                <WalletIcon className='w-6 h-6 mr-4' />Buy now
              </button>
              <div className="flex flex-row justify-center items-center mt-6">
                <hr className="border w-full" />
                <p className="flex flex-shrink-0 px-4 text-base leading-4 text-gray-600">or</p>
                <hr className="border w-full" />
              </div>
              <button onClick={() => setGift(true)}
                type="button"
                className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-purple-500 hover:bg-gray-300 duration-300 mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-purple-600 px-8 py-3 text-base font-medium text-white hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                <GiftIcon className='w-6 h-6 mr-4' />Gift this course
              </button></>
          }

        } else {
          if (cartItems[thisCourse?.id] === undefined || cartItems[thisCourse?.id] === false) {
            return <><button
              onClick={() => {
                addToCart(parseInt(thisCourse?.id))
                setCart(true)
              }}
              type="button"
              className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-purple-500 hover:bg-gray-300 duration-300 mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-purple-600 px-8 py-3 text-base font-medium text-white hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              <ShoppingCartIcon className='w-6 h-6 mr-4' />Add to cart
            </button>
              <button
                onClick={() => setShow(true)}
                type="button"
                className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-purple-500 hover:bg-gray-300 duration-300 mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-200 px-8 py-3 text-base font-medium text-purple-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                <WalletIcon className='w-6 h-6 mr-4' />Buy now
              </button></>
          } else {
            return <> <button
              type="button"
              className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-purple-500 hover:bg-gray-300 duration-300 mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-200 px-8 py-3 text-base font-medium text-purple-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              <ShoppingCartIcon className='w-6 h-6 mr-4' />Go to cart
            </button>
              <button
                onClick={() => setShow(true)}
                type="button"
                className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-purple-500 hover:bg-gray-300 duration-300 mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-200 px-8 py-3 text-base font-medium text-purple-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                <WalletIcon className='w-6 h-6 mr-4' />Buy now
              </button></>
          }

        }

      }
    } else if (isLearn) {
      return <Link to={`/learning/${id}`}> <button
        type="submit"
        className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-purple-500 hover:bg-gray-300 duration-300 mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-purple-600 px-8 py-3 text-base font-medium text-white hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      >
        Go to course
      </button></Link>
    }
    else {
      price = 'Free'
      return <button onClick={enrollFree}
        type="submit"
        className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-purple-500 hover:bg-gray-300 duration-300 mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-purple-600 px-8 py-3 text-base font-medium text-white hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      >
        Enroll now
      </button>
    }
  }
  // const [courses, setCourses] = useState();

  // const getCourses = async () => {
  //   try {
  //     const response = await apiCourse.get("/getCourses");
  //     console.log(response.data)
  //     setCourses(response.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // useEffect(() => {
  //   getCourses();
  // }, []
  // )
  const linkImg = 'http://storage.cloud.google.com/arthub-bucket/'
  const linkVid = 'https://storage.cloud.google.com/arthub-bucket/'
  //get this course rating
  const formCourseRating = new FormData();
  formCourseRating.append('courseId', id);
  const [thisCourseRating, setThisCourseRating] = useState()
  const getThisCourseRating = async () => {
    try {
      const response = await axios.post("http://localhost:8080/rate/getCourseRate", formCourseRating);
      setThisCourseRating(response.data)
    } catch (e) {
      alert(e)
    }
  }

  useEffect(() => {
    getThisCourseRating();
  }, [])
  const [users, setUsers] = useState()
  const getUsers = async () => {
    try {
      const response = await api.get("/accounts");
      // console.log(response.data)
      setUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUsers();
  }, []
  )
  const findAccountById = (id) => {
    return users?.find((user) => user.id === id)
  }
  const courseRate = thisCourseRating?.filter((rate) => rate.accountId != thisCourse?.accountId)

  //Gift this course
  const [receiverPassword, setReceiverPassword] = useState(generateString(20))
  const [gift, setGift] = useState(false)
  const [isopen, setIsOpen] = useState(false)
  const [alertMess, setAlertMess] = useState()
  const [receiverMail, setReceiverMail] = useState()
  const [receiverFirstname, setReceiverFirstname] = useState()
  const [receiverLastname, setReceiverLastname] = useState()
  const receiverMailCheck = users?.find((user) => user.email == receiverMail)

  // save reveiver account
  const formReceiverData = new FormData();
  //form mail
  const [loading, setLoading] = useState(false)
  const formMailData = new FormData();
  const [senderMessages, setSenderMessages] = useState('')
  const [action, setAction] = useState(1)
  formMailData.append('courseId', thisCourse?.id);
  // formMailData.append('receiverEmail', receiverMail);
  formMailData.append('receiverEmail', 'kztoan01@gmail.com');
  formMailData.append('SenderMessages', senderMessages);
  formMailData.append('receiverName', receiverFirstname + " " + receiverLastname);
  formMailData.append('receiverPassword', receiverPassword);
  formMailData.append('senderName', thisAccount?.firstname + " " + thisAccount?.lastname);
  formMailData.append('action', action);
  async function save(e) {
    e.preventDefault();
    try {
      setAction(1)

      await axios.post("http://localhost:8080/api/accounts", {
        username: generateString(20),
        lastname: receiverLastname,
        firstname: receiverFirstname,
        email: receiverMail,
        password: receiverPassword,
        roleId: 2,
        isActive: 0
      }).then(response => {
        formReceiverData.append('courseId', thisCourse?.id);
        formReceiverData.append('accountId', response.data?.id);
        formReceiverData.append('status', status);
        formReceiverData.append('senderId', thisAccount?.id);
        formReceiverData.append('message', senderMessages);
      });
      await axios.post("http://localhost:8080/course/enrol", formReceiverData).then(response => {
        //setOpen(true)
        getLearners()
      })
      await axios.post("http://localhost:8080/course/sendMailToReceiver", formMailData).then(response => {
        setLoading(false)
      });;
    } catch (err) {
      alert(err);
    }
  }
  const [falseopen, setFalseOpen] = useState(false)
  const [roleopen, setRoleOpen] = useState(false)
  const formReceiver = new FormData();
  formReceiver.append('courseId', thisCourse?.id);
  formReceiver.append('accountId', receiverMailCheck?.id);
  formReceiver.append('status', 1);
  formReceiver.append('senderId', thisAccount?.id);
  formReceiver.append('message', senderMessages);
  //send to receiver has arthub account
  const formMail = new FormData();
  formMail.append('courseId', thisCourse?.id);
  // formMailData.append('receiverEmail', receiverMail);
  formMail.append('receiverEmail', 'kztoan01@gmail.com');
  formMail.append('SenderMessages', senderMessages);
  formMail.append('receiverName', receiverFirstname + " " + receiverLastname);
  formMail.append('receiverPassword', receiverPassword);
  formMail.append('senderName', thisAccount?.firstname + " " + thisAccount?.lastname);
  formMail.append('action', 2);
  async function save2(e) {
    e.preventDefault();
    try {
      setAction(2)
      await axios.post("http://localhost:8080/course/enrol", formReceiver).then(response => {
        if (response.data == "Course is already Enrolled") {
          setFalseOpen(true)
        } else {
          save3(e)
        }
        getLearners()
      })
    } catch (err) {
      alert(err);
    }
  }
  async function save3(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/course/sendMailToReceiver", formMail).then(response => {
        setLoading(false)
      });
    } catch (err) {
      alert(err);
    }
  }
  const receiverCheckLearn = learner?.filter((learner) => learner.accountId === receiverMailCheck?.id);
  const isReceiverCheckLearn = receiverCheckLearn?.find((course) => course.courseId === thisCourse?.id)
  const [shownow, setShownow] = useState(false)
  async function sendGift(e) {
    if (receiverMailCheck) {
      if (receiverMailCheck?.roleId == 2) {
        if (receiverMailCheck?.id == thisAccount?.id) {
          setRoleOpen(true)
        } else if (isReceiverCheckLearn) {
          setFalseOpen(true)
        }
        else {
          setShownow(true)
          // setLoading(true)
          //save2(e)
        }
      } else {
        setRoleOpen(true)
      }
    } else {
      setIsOpen(true)
      setGift(false)
    }
  }
  //// description
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const [convertedContent, setConvertedContent] = useState(null);
  const [courseDes, setCourseDes] = useState()

  useEffect(() => {
    if (!courseDes) {
      setCourseDes(thisCourse?.description)
    }
  }, [thisCourse])


  // buy now anf checkout with paypal
  const [showGift, setShowGift] = useState(false);
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);
  //gift order
  // creates a paypal order
  const [giftsuccess2, setGiftSuccess2] = useState(false);
  const [giftorderID2, setGiftOrderID2] = useState(false);
  const createGiftOrder2 = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: thisCourse?.name,
          amount: {
            currency_code: "USD",
            value: thisCourse?.price,
          },
        },
      ],
    }).then((orderID) => {
      setGiftOrderID2(orderID);
      return orderID;
    });
  };

  // check Approval
  const onGiftApprove2 = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setGiftSuccess2(true);
    });
  };

  useEffect(() => {
    if (giftsuccess2) {
      setLoading(true)
      try {
        setAction(2)
        axios.post("http://localhost:8080/course/enrol", formReceiver).then(response => {
          getLearners()
          axios.post("http://localhost:8080/course/sendMailToReceiver", formMail).then(response => {
            setLoading(false)
            setSend(true)
          });
        })
      } catch (err) {
        alert(err);
      }
      console.log('Order successful . Your order id is--', giftorderID);
    }
  }, [giftsuccess2]);
  // creates a paypal order
  const [giftsuccess, setGiftSuccess] = useState(false);
  const [giftorderID, setGiftOrderID] = useState(false);
  const createGiftOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: thisCourse?.name,
          amount: {
            currency_code: "USD",
            value: thisCourse?.price,
          },
        },
      ],
    }).then((orderID) => {
      setGiftOrderID(orderID);
      return orderID;
    });
  };

  // check Approval
  const onGiftApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setGiftSuccess(true);
    });
  };

  useEffect(() => {
    if (giftsuccess) {
      setLoading(true)
      // if (receiverMailCheck?.roleId == 2) {
      //   try {
      //     setAction(2)
      //     axios.post("http://localhost:8080/course/enrol", formReceiver).then(response => {
      //       getLearner()
      //       axios.post("http://localhost:8080/course/sendMailToReceiver", formMail).then(response => {
      //         setLoading(false)
      //         setSend(true)
      //       });
      //     })
      //   } catch (err) {
      //     alert(err);
      //   }
      // }
      setIsOpen(false)
      try {
        setAction(1)
        setStatus(1)
        axios.post("http://localhost:8080/api/accounts", {
          username: generateString(20),
          lastname: receiverLastname,
          firstname: receiverFirstname,
          email: receiverMail,
          password: receiverPassword,
          roleId: 2,
          isActive: 0
        }).then(response => {
          formReceiverData.append('courseId', thisCourse?.id);
          formReceiverData.append('accountId', response.data?.id);
          formReceiverData.append('status', 1);
          formReceiverData.append('senderId', thisAccount?.id);
          formReceiverData.append('message', senderMessages);
          axios.post("http://localhost:8080/course/enrol", formReceiverData).then(response => {
            //setOpen(true)
            getLearners()
            axios.post("http://localhost:8080/course/sendMailToReceiver", formMailData).then(response => {
              setLoading(false)
              setSend(true)
            });
          })
        });
      } catch (err) {
        alert(err);
      }
      console.log('Order successful . Your order id is--', giftorderID);
    }
  }, [giftsuccess]);
  // creates a paypal order
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: thisCourse?.name,
          amount: {
            currency_code: "USD",
            value: thisCourse?.price,
          },
        },
      ],
    }).then((orderID) => {
      setOrderID(orderID);
      return orderID;
    });
  };

  // check Approval
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setSuccess(true);
    });
  };

  //capture likely error
  const onError = (data, actions) => {
    setErrorMessage("An Error occured with your payment ");
  };

  useEffect(() => {
    if (success) {
      if (localStorage.getItem("STU-authenticated")) {
        try {
          axios.post("http://localhost:8080/course/enrol", formData).then(response => {
            getLearners();
            setOpen(true)
            setShow(false)

          })
        } catch (err) {
          alert(err);
        }
      } else {
        navigate('/login')
      }
      console.log('Order successful . Your order id is--', orderID);
    }
  }, [success]);

  const [share, setShare] = useState(false)
  return (
    <>
      <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
        <div className="bg-white">
          <div className="pt-6">
            <nav aria-label="Breadcrumb">
              <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                {thisCourse?.categories?.map((cate) => (
                  <li key={cate.id}>
                    <div className="flex items-center">
                      <a href="" className="mr-2 text-sm font-medium text-gray-900">
                        {cate?.name}
                      </a>
                      <svg
                        width={16}
                        height={20}
                        viewBox="0 0 16 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-5 w-4 text-gray-300"
                      >
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                      </svg>
                    </div>
                  </li>
                ))}
                <li className="text-sm">
                  <a href="" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                    {thisCourse?.name}
                  </a>
                </li>
              </ol>
            </nav>

            {/* Image gallery */}
            <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
              <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                <img
                  // src={product.images[0].src}
                  // alt={product.images[0].alt}
                  src={linkImg + thisCourse?.images?.one}
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                  <img
                    // src={product.images[1].src}
                    // alt={product.images[1].alt}
                    src={linkImg + thisCourse?.images?.two}
                    alt=""
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                  <img
                    // src={product.images[2].src}
                    // alt={product.images[2].alt}
                    src={linkImg + thisCourse?.images?.four}
                    alt=""
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
              <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                <img
                  // src={product.images[3].src}
                  // alt={product.images[3].alt}
                  src={linkImg + thisCourse?.images?.three}
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>

            {/* Product info */}
            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{thisCourse?.name}</h1>
              </div>

              {/* Options */}
              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">{price}</p>

                {/* Reviews */}
                <div className="mt-6">
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            thisCourse?.avg > rating ? 'text-gray-900' : 'text-gray-200',
                            'h-5 w-5 flex-shrink-0'
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="sr-only">{reviews.average} out of 5 stars</p>
                    <a href={reviews.href} className="ml-3 text-sm font-medium text-purple-600 hover:text-purple-500">
                      {thisCourse?.count} reviews
                    </a>
                  </div>
                </div>

                <form className="mt-10">
                  {/* Includes */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">This course includes:</h3>
                    <div className="mt-4">
                      <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                        {includes?.map((include) => (
                          <li key={include} className="text-gray-400">
                            <span className="text-gray-600">{include}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Sizes
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <a href="#" className="text-sm font-medium text-purple-600 hover:text-purple-500">
                    Size guide
                  </a>
                </div>
              </div> */}
                  {/* {thisCourse?.price > 0 && isLearn ? (
                                        <p className="text-sm font-medium text-gray-900">Free</p>
                                    ) : <p className="text-sm font-medium text-gray-900">{product.price}</p>} */}
                  {/* <Link to={`/learning/${id}`}> <button
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-purple-600 px-8 py-3 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  {enroll}
                </button></Link> */}
                  {displayMessage()}
                  <button
                    onClick={() => setShare(true)}
                    type="button"
                    className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-purple-500 hover:bg-gray-300 duration-300 mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-200 px-8 py-3 text-base font-medium text-purple-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                    <ShareIcon className='w-6 h-6 mr-4' />Share this course
                  </button>
                  {show ? (
                    <PayPalButtons className='mt-8'
                      style={{ layout: "vertical" }}
                      createOrder={createOrder}
                      onApprove={onApprove}
                    />
                  ) : null}
                </form>
              </div>

              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                {/* Description and details */}
                <div>
                  <h3 className="sr-only">Introduction</h3>

                  <div className="space-y-6">
                    <p className="text-base text-gray-900">{thisCourse?.introduction}</p>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="text-xl font-medium text-gray-900">What you'll learn</h3>

                  <div className="mt-4">
                    <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                      <li className="text-gray-400">
                        <span className="text-gray-600">{thisCourse?.learningObjective?.one}</span>
                      </li>
                    </ul>
                    <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                      <li className="text-gray-400">
                        <span className="text-gray-600">{thisCourse?.learningObjective?.two}</span>
                      </li>
                    </ul>
                    <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                      <li className="text-gray-400">
                        <span className="text-gray-600">{thisCourse?.learningObjective?.three}</span>
                      </li>
                    </ul>
                    <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                      <li className="text-gray-400">
                        <span className="text-gray-600">{thisCourse?.learningObjective?.four}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="text-xl font-medium text-gray-900">Description</h2>

                  <div className="mt-4 space-y-6">
                    {/* {thisCourse.descriptions.map((description) => ( */}
                    <div className="text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: thisCourse?.description }}></div>
                    {/* ))} */}
                  </div>
                </div>
                {/* gallery */}
                {/* <div className="mt-10">
                <h2 className="text-xl font-medium text-gray-900">Course content</h2>
                {thisCourse?.sections?.map((section) => (
                  <Disclosure as="div" key={section.id} className="mt-8 border-t border-gray-200 px-4 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.section_name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {section.videos.map((video) => (
                              <div key={video.id} className="flex items-center"
                                onClick={() => {
                                  if (video.trial === true) {
                                    setDetail(true)
                                    setActiveVid(video.data);
                                  }
                                }}>
                                <PlayIcon class="h-6 w-6 text-gray-500" />
                                <label
                                  className="hover:bg-gray-200 p-2
                                      rounded-xl h-2/6 cursor-pointer ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {video.trial === true ? video.name + " - Preview Available" : video.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </div> */}
                <div className="mt-10">
                  <h2 className="text-xl font-medium text-gray-900">Course content</h2>

                  {thisCourse?.sections?.map((section) => (
                    <Disclosure key={section.id} as="div" className="mt-4 w-full">
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                            <span>{section.section_name}</span>
                            <ChevronUpIcon
                              className={`${open ? '' : 'rotate-180 transform'
                                } h-5 w-5 text-purple-500`}
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                            <div className="space-y-6">
                              {section.videos.map((video) => (
                                <div key={video.id} className="flex items-center"
                                  onClick={() => {
                                    if (video.trial === true) {
                                      setDetail(true)
                                      setActiveVid(video.data);
                                    }
                                  }}>
                                  <PlayIcon class="h-6 w-6 text-gray-500" />
                                  <label
                                    className="hover:bg-gray-200 p-2
                                      rounded-xl h-2/6 cursor-pointer ml-3 min-w-0 flex-1 text-gray-500"
                                  >
                                    {video.trial === true ? video.name + " - Preview Available" : video.name}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>))}
                  {/* <Disclosure as="div" className="mt-2">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                          <span>Do you offer technical support?</span>
                          <ChevronUpIcon
                            className={`${open ? 'rotate-180 transform' : ''
                              } h-5 w-5 text-purple-500`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                          No.
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure> */}
                </div>
                {/* reviews */}
                <div className="bg-white py-24 sm:py-32">
                  <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="text-xl font-medium text-gray-900">Reviews</h2>
                    <div className="mt-4 space-y-6">
                      {courseRate?.slice(0).reverse().map((post) => (
                        <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
                          <div className="flex items-center gap-x-4 text-xs mt-4">
                            <time dateTime={post.timeRate} className="text-gray-500">
                              {post.timeRate.split('T')[0]}
                            </time>
                            {/* <a
                              // href={post.category.href}
                              className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                          >
                              {post.rate} star
                          </a> */}
                            <div className="flex items-center">
                              {[0, 1, 2, 3, 4].map((rating) => (
                                <StarIcon
                                  key={rating}
                                  className={classNames(
                                    post.rate > rating ? 'text-gray-900' : 'text-gray-200',
                                    'h-5 w-5 flex-shrink-0'
                                  )}
                                  aria-hidden="true"
                                />
                              ))}
                            </div>
                          </div>
                          <div className="group relative">
                            {/* <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                              <a 
                              href=""

                              >
                                  <span className="absolute inset-0" />
                                  {post.title}
                              </a>
                          </h3> */}

                            <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.comment}</p>
                          </div>
                          <div className="relative mt-8 flex items-center gap-x-4">
                            <img src={findAccountById(post.accountId)?.image ? linkImg + findAccountById(post.accountId)?.image : '../assets/image/default.jpg'} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                            <div className="text-sm leading-6">
                              <p className="font-semibold text-gray-900">
                                <a
                                  href=""
                                >
                                  <span className="absolute inset-0" />
                                  {findAccountById(post.accountId)?.firstname + " " + findAccountById(post.accountId)?.lastname}
                                </a>
                              </p>
                              {/* <p className="text-gray-600">{post.author.role}</p> */}
                            </div>
                          </div>
                        </article>
                        // <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
                        //   <div className="flex items-center gap-x-4 text-xs mt-4">
                        //     <time dateTime={post.datetime} className="text-gray-500">
                        //       {post.date}
                        //     </time>
                        //     <a
                        //       href={post.category.href}
                        //       className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                        //     >
                        //       {post.category.title}
                        //     </a>
                        //   </div>
                        //   <div className="group relative">
                        //     <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        //       <a href={post.href}>
                        //         <span className="absolute inset-0" />
                        //         {post.title}
                        //       </a>
                        //     </h3>
                        //     <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
                        //   </div>
                        //   <div className="relative mt-8 flex items-center gap-x-4">
                        //     <img src={post.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                        //     <div className="text-sm leading-6">
                        //       <p className="font-semibold text-gray-900">
                        //         <a href={post.author.href}>
                        //           <span className="absolute inset-0" />
                        //           {post.author.name}
                        //         </a>
                        //       </p>
                        //       <p className="text-gray-600">{post.author.role}</p>
                        //     </div>
                        //   </div>
                        // </article>
                      ))}
                    </div>
                  </div>
                </div>
                {/* instructor */}
                <div className="mt-10">

                  <div className="px-4 sm:px-0">
                    <h2 className="text-xl font-medium text-gray-900">Instructor</h2>
                  </div>
                  <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          <div className="flex items-center gap-x-6">
                            <img className="h-32 w-32 rounded-full" src={linkImg + thisCourse?.instructorImage} alt="" />
                            <div>
                              <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{thisCourse?.instructorName}</h3>
                              <Link to={`/instructor/${thisCourse?.accountId}`}><p className="cursor-pointer text-sm font-semibold leading-6 text-purple-600">Learn more</p></Link>
                            </div>
                          </div>
                        </dt>
                        {/* <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{thisCourse?.instructorName}</dd> */}
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{thisCourse?.instructorEmail}</dd>
                      </div>
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Introduction</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {thisCourse?.bio}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*  notification */}
          <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                            <CheckCircleIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                          </div>
                          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                              Enroll Course Successfully
                            </Dialog.Title>
                            <div className="mt-2">
                              <p className="text-sm text-gray-500">
                                Great choice, {thisAccount?.firstname}. Click Done to go to the course content now!
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <Link to={`/learning/${id}`}><button
                          type="button"
                          className="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 sm:ml-3 sm:w-auto"
                          onClick={() => {
                            getLearners()
                            setOpen(false)
                          }}
                        >
                          Done
                        </button></Link>
                        <Link to="/search" ><button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          onClick={() => setOpen(false)}
                          ref={cancelButtonRef}
                        >
                          Cancel
                        </button></Link>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
          {/* preview video  */}
          <Transition.Root show={detail} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setDetail}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
              </Transition.Child>

              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                    enterTo="opacity-100 translate-y-0 md:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 md:scale-100"
                    leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                  >
                    <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                      <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                        <div className="rounded-lg h-full w-full">
                          <h3 className="text-xl font-medium text-gray-900">{thisCourse?.name}</h3>
                          <p className="mt-2 font-medium text-gray-900">Preview Video</p>
                          <div className="pt-12 pr-32 px-2 pt-2 rounded-xl" style={{ width: "920px", height: "500px" }}>
                            <iframe allowFullScreen={true} src={linkVid + activeVid} className="w-full h-5/6"></iframe>
                          </div>

                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
          {/* gift */}
          <Transition.Root show={gift} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setGift}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
              </Transition.Child>

              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                    enterTo="opacity-100 translate-y-0 md:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 md:scale-100"
                    leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                  >
                    <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                      <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                        {/* content */}
                        <header className="bg-white">
                          <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900">ArtHub Gift</h1>
                          <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:px-8">

                            {/* this course info */}
                            <div className="mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                              <Link to={`/${thisCourse?.id}`}><div className="group relative">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                  <img
                                    src={linkImg + thisCourse?.image}
                                    // {product.imageSrc}
                                    alt=""
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                  />
                                </div>
                                <div className="mt-4 flex justify-between">
                                  <div>
                                    <h3 className="text-sm text-gray-700">
                                      <a href="">
                                        <span aria-hidden="true" className="absolute inset-0" />
                                        {thisCourse?.name}
                                      </a>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">Instructor: {thisCourse?.instructorName}</p>
                                  </div>
                                  {thisCourse?.price === 0 ? (
                                    <p className="text-sm font-medium text-gray-900">Free</p>
                                  ) : <p className="text-sm font-medium text-gray-900">${thisCourse?.price}</p>}

                                </div>
                              </div></Link>
                            </div> </div>
                        </header>
                        <main>
                          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{/*content */}
                            <div class="border-b border-gray-900/10 pb-12">
                              <h2 class="text-base font-semibold leading-7 text-gray-900">Enter a message to send to the recipient</h2>
                              <textarea
                                onChange={(e) => {
                                  setSenderMessages(e.target.value);
                                }}
                                placeholder="Enter your reason for giving away the course and what you want to say to the recipient of this course."
                                name="message"
                                id="message"
                                rows={4}
                                className="mt-4 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                                defaultValue={''}
                              />
                              <h2 class="mt-4 text-base font-semibold leading-7 text-gray-900">Enter recipient information</h2>
                              <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div class="sm:col-span-4"> <label for="first-name"
                                  class="block text-sm font-medium leading-6 text-gray-900">First name</label>
                                  <div class="mt-2"> <input type="text" name="first-name" id="first-name" autocomplete="given-name"
                                    value={receiverFirstname}
                                    onChange={(e) => {
                                      setReceiverFirstname(e.target.value)
                                    }}
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6" />
                                  </div>
                                </div>
                                <div class="sm:col-span-4 w-48"> <label for="last-name"
                                  class="block text-sm font-medium leading-6 text-gray-900">Last name</label>
                                  <div class="mt-2"> <input type="text" name="last-name" id="last-name" autocomplete="family-name"
                                    value={receiverLastname}
                                    onChange={(e) => {
                                      setReceiverLastname(e.target.value)
                                    }}
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6" />
                                  </div>
                                </div>
                                <div class="sm:col-span-12"> <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email
                                  address</label>
                                  <div class="mt-2"> <input id="email" name="email" type="email" autocomplete="email"
                                    value={receiverMail}
                                    onChange={(e) => {
                                      setReceiverMail(e.target.value)
                                    }}
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6" />
                                  </div>
                                </div>
                                <div class="sm:col-span-12"> <button type="submit"
                                  onClick={(e) => sendGift(e)}
                                  class="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">
                                  Check Out
                                </button>
                                  {shownow ? (
                                    <PayPalButtons className='mt-8'
                                      style={{ layout: "vertical" }}
                                      createOrder={createGiftOrder2}
                                      onApprove={onGiftApprove2}
                                    />
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>

                        </main>

                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        </div>
        {/* mail not exist */}
        <Transition.Root show={isopen} as={Fragment}>
          <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setIsOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                            Look like the person you want to give the course to does not currently have an ArtHub account.
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Please check the email account of the person you want to send to is correct. If the account is filled out correctly, ArtHub can still send your course to the recipient however if they do not access the course within 10 days, your money will not be refunded.
                            </p>
                            <p className="text-sm text-gray-500">
                              There are 2 solutions.
                            </p>
                            <p className="text-sm text-gray-500">
                              Click Send now: After you pay, ArtHub will send a notification to the course recipient via their email and create a temporary account for this person. They can log in with that account and exchange their personal information.
                            </p>
                            <p className="text-sm text-gray-500">
                              Click Send later: You can notify the recipient to create an ArtHub account and return to send the course later.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 sm:ml-3 sm:w-auto"
                        onClick={(e) => {
                          setShowGift(true)
                          //setIsOpen(false)
                          //setLoading(true)
                          //save(e)
                        }}
                      >
                        Send now
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => {
                          setIsOpen(false)
                          setGift(true)
                        }}
                        ref={cancelButtonRef}
                      >
                        Send later
                      </button>

                    </div>{showGift ? (
                      <PayPalButtons className='mt-8'
                        style={{ layout: "vertical" }}
                        createOrder={createGiftOrder}
                        onApprove={onGiftApprove}
                      />
                    ) : null}
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        <Transition.Root show={loading} as={Fragment}>
          <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setLoading}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                          <CodeBracketIcon className="h-6 w-6 text-purple-600" aria-hidden="true" />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                            Loading ...
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Your request is being processed. Please wait a moment.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 sm:ml-3 sm:w-auto"
                                            onClick={() => setAddOpen(false)}
                                        >
                                            Done
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => setAddOpen(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div> */}
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        <Transition.Root show={falseopen} as={Fragment}>
          <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setFalseOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                            It seems like the person you want to give the course to has already participated in this course. Please double check to make sure you entered the correct email address.
                          </Dialog.Title>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 sm:ml-3 sm:w-auto"
                        onClick={(e) => {
                          setFalseOpen(false)
                          setGift(true)
                        }}
                      >
                        Accept
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        <Transition.Root show={roleopen} as={Fragment}>
          <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setRoleOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                            Invalid email address. Make sure you have entered the correct address of a student on the ArtHub platform or an address that does not have an ArtHub account.
                          </Dialog.Title>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 sm:ml-3 sm:w-auto"
                        onClick={(e) => {
                          setRoleOpen(false)
                          setGift(true)
                        }}
                      >
                        Accept
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        {/* send course */}
        <Transition.Root show={send} as={Fragment}>
          <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setSend}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                          <CheckCircleIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                            Gift this course success!
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              The course has been sent to the recipient via email and ArtHub account
                            </p>
                            <p className="text-sm text-gray-500">
                              Thank you for choosing and trusting ArtHub
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 sm:ml-3 sm:w-auto"
                        onClick={() => {
                          setSend(false)
                        }}
                      >
                        Done
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        {/* add to cart success */}
        <Transition.Root show={cart} as={Fragment}>
          <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setCart}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                          <CheckCircleIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                            Added to cart
                          </Dialog.Title>
                          {/* <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"> */}

                          {/* </div> */}
                        </div>
                      </div>
                      <Link to={`/${thisCourse?.id}`}><div className="group relative mt-4">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                          <img
                            src={linkImg + thisCourse?.image}
                            // {product.imageSrc}
                            alt=""
                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                          />
                        </div>
                        <div className="mt-4 flex justify-between">
                          <div>
                            <h3 className="text-sm text-gray-700">
                              <a href="">
                                <span aria-hidden="true" className="absolute inset-0" />
                                {thisCourse?.name}
                              </a>
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">Instructor: {thisCourse?.instructorName}</p>
                          </div>
                          {thisCourse?.price === 0 ? (
                            <p className="text-sm font-medium text-gray-900">Free</p>
                          ) : <p className="text-sm font-medium text-gray-900">${thisCourse?.price}</p>}

                        </div>
                      </div></Link>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 sm:ml-3 sm:w-auto"
                        onClick={() => {
                          setCart(false)
                        }}
                      >
                        Go to Cart
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        <Transition.Root show={share} as={Fragment}>
          <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setShare}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                          <ShareIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900 mt-2">
                            Share this course
                          </Dialog.Title>
                          {/* <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"> */}

                          {/* </div> */}
                        </div>
                      </div>
                      <Link to={`/${thisCourse?.id}`}><div className="group relative mt-4">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                          <img
                            src={linkImg + thisCourse?.image}
                            // {product.imageSrc}
                            alt=""
                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                          />
                        </div>
                        <div className="mt-4 flex justify-between">
                          <div>
                            <h3 className="text-sm text-gray-700">
                              <a href="">
                                <span aria-hidden="true" className="absolute inset-0" />
                                {thisCourse?.name}
                              </a>
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">Instructor: {thisCourse?.instructorName}</p>
                          </div>
                          {thisCourse?.price === 0 ? (
                            <p className="text-sm font-medium text-gray-900">Free</p>
                          ) : <p className="text-sm font-medium text-gray-900">${thisCourse?.price}</p>}

                        </div>
                      </div></Link>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <FacebookShareButton
                        className="w-full"
                        url={"https://www.facebook.com/toan.tranbao.22082003/"}
                        quote={"フェイスブックはタイトルが付けれるようです"}
                        hashtag={"#arthub"}
                        description={"aiueo"}
                      >
                        <button
                          type="button"
                          className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-blue-500 hover:bg-gray-300 duration-300 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-200 px-8 py-3 text-base font-medium text-blue-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                        >
                          Share on Facebook
                        </button>
                      </FacebookShareButton>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <TwitterShareButton
                        className="w-full"
                        title={"test"}
                        url={"https://peing.net/ja/"}
                        hashtags={["hashtag1", "hashtag2"]}
                      >
                        <button
                          type="button"
                          className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-black-500 hover:bg-gray-300 duration-300 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-200 px-8 py-3 text-base font-medium text-black-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                        >
                          Share on Twitter
                        </button>
                      </TwitterShareButton>
                    </div>

                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </PayPalScriptProvider>
    </>
  )
}