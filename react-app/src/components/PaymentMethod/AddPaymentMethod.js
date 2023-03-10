import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkCreatePayment } from "../../store/payment_method";
import './PaymentMethod.css'


const AddPaymentMethod = () => {
  const dispatch = useDispatch();
  const [name_on_card, setNameOnCard] = useState('')
  const [card_number, setCardNumber] = useState('')
  const [expire_month, setExpireMonth] = useState(1)
  const [expire_year, setExpireYear] = useState()
  const [cvv, setCvv] = useState()
  const [card_type, setCardType] = useState('Mastercard')
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal()
  const today = new Date()
  const thisYear= today.getFullYear()
  const thisMonth= today.getMonth()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    if (expire_year < thisYear) {
      setErrors(["Invalid Expire Date"])
    } else if (expire_year == thisYear && expire_month <= thisMonth) {
      setErrors(["Invalid Expire Date"])
    } else if (cvv < 100 || cvv > 9999) {
      setErrors(["Invalid CVV"])
    } else {
      const cardData = {
        name_on_card,
        card_number,
        expire_month,
        expire_year,
        cvv,
        card_type
      }
      const data = await dispatch(thunkCreatePayment(cardData))
      if (data.errors) {
        setErrors(data.errors)
      } else {
        setErrors([]);
        closeModal()
      }
    }
  }

  return (
    <div className="addPaymentMethod">
      <h1>
        Add your card
      </h1>
      <form className="addPaymentForm" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div className="credit-form">
          <label>Name on Card:</label>
          <input
            type='text'
            value={name_on_card}
            onChange={(e) => setNameOnCard(e.target.value)}
            required
          />
        </div>
        <div className="credit-form">
          <label>Card Number:</label>
          <input
            type='number'
            value={card_number}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
        </div>
        <div className="expire">
          <label>Expiration Date:</label>
          <div>
            <select
              type='number'
              value={expire_month}
              onChange={(e) => setExpireMonth(e.target.value)}
              required
              className="expire_month"
              >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
            </select>
            <input
              type='number'
              value={expire_year}
              onChange={(e) => setExpireYear(e.target.value)}
              required
              className="expire_year"
            />
          </div>
        </div>
        <div className="credit-form">
          <label>CVV:</label>
          <input
            type='number'
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
          />
        </div>
        <div className="credit-form">
          <label>Card Type:</label>
          <select
            type='text'
            value={card_type}
            onChange={(e) => setCardType(e.target.value)}
            required
          >
            <option>Mastercard</option>
            <option>Visa</option>
            <option>American Express</option>
            <option>Discover</option>
          </select>
        </div>
        <div>
          <button className='submitButton' type="submit">Add Card</button>
        </div>
      </form>
    </div>
  )
}

export default AddPaymentMethod;
