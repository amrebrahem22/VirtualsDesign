import React , {useState} from 'react';
import { mailUrl } from '../../helpers/API_Routes';
import axios from 'axios';

function ContactForm({setShow}) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(mailUrl, {name, email, phone, subject, message})
        .then(res => {
            res.data.success && setShow(true)
            setName('')
            setEmail('')
            setPhone('')
            setSubject('')
            setMessage('')
        }).catch(err => console.log(err))
    };

    return (
        <form action="" onSubmit={handleSubmit}>
            <div className="rn-form-group">
                <input 
                type="text"
                name="name"
                placeholder="Your Name"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                />
            </div>

            <div className="rn-form-group">
                <input 
                type="email"
                name="email"
                placeholder="Your Email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                />
            </div>

            <div className="rn-form-group">
                <input 
                type="text"
                name="phone"
                placeholder="Phone Number"
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                />
            </div>

            <div className="rn-form-group">
                <input 
                type="text"
                name="subject"
                placeholder="Subject"
                required
                value={subject}
                onChange={e => setSubject(e.target.value)}
                />
            </div>

            

            <div className="rn-form-group">
                <textarea 
                name="message"
                placeholder="Your Message"
                required
                value={message}
                onChange={e => setMessage(e.target.value)}
                >
                </textarea>
            </div>

            <div className="rn-form-group">
                <button className="rn-button-style--2 btn-solid" type="submit" value="submit" name="submit" id="mc-embedded-subscribe">Submit Now</button>
            </div>
        </form>
    )
}
export default ContactForm;
