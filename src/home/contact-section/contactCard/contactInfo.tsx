import Image from "next/image";
import React from "react";
import SocialLinks from "./SocialLinks";
import { contactDetails } from "../../../assets/data/content/contact";
import Link from "next/link";
const ContactInfo = () => {
    return (
        <div className="ctc-info flx-c">
            {contactDetails.map((item, index) => (
                <React.Fragment key={index + "ctc-info"}>
                    {item.link ? (
                        <Link
                            className="ctc-card"
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className="flx-c">
                                <Image
                                    src={item.svg}
                                    alt={item.alt}
                                    width={45}
                                    height={45}
                                    loading="lazy"
                                />
                            </span>
                            <p>{item.text}</p>
                        </Link>
                    ) : (
                        <div className="ctc-card">
                            <span className="flx-c">
                                <Image
                                    src={item.svg}
                                    alt={item.alt}
                                    width={45}
                                    height={45}
                                    loading="lazy"
                                />
                            </span>
                            <p>{item.text}</p>
                        </div>
                    )}
                </React.Fragment>
            ))}
            <div className="ctc-social_card">
                <p>Nous suivre</p>
                <SocialLinks />
            </div>
        </div>
    );
};

export default ContactInfo;
