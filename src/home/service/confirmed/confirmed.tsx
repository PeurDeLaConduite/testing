import React from "react";
import Image from "next/image";
import Space from "../../../utils/Space";
import { servicesData } from "../../../assets/data/servicesData";
import Link from "next/link";
const Confirmed = () => {
    const { title, subtitle, intro, services } = servicesData.confirmed;

    return (
        <div className="services content-wrapper content-srv" id="confirmed">
            <Image
                className="road-confirmed"
                src="/img/services/road-confirmed.svg"
                alt={`Logo background`}
                width={1706.7}
                height={2596.4}
                loading="lazy"
                priority={false}
            />
            <div className="card_bg"></div>

            <div className="segment segment-title">
                <div className="card_empty flx-c">
                    <h2 className="card_title">{title}</h2>
                </div>
            </div>

            <div className="segment">
                <div className="card_header flx-c">
                    <p>
                        {subtitle}
                        <Space />
                        <span>{intro}</span>
                    </p>
                    <div className="aside-bg">
                        <Image
                            className="srv-aside-bg"
                            src="/img/services/aside-bg.svg"
                            alt="Logo background"
                            width={360}
                            height={860}
                            loading="lazy"
                            priority={false}
                        />
                    </div>
                </div>

                <div className="card_content">
                    <div className="flx-c srv-description o1">
                        <p>
                            Redécouvrez
                            <br />
                            Le plaisir de conduire !
                        </p>
                        <div className="flx-c icon-description">
                            <Image
                                className="srv-aside-bg"
                                src="https://assets.peur-de-la-conduite.fr/img/services/Trophy.svg"
                                alt={`Logo Trophy`}
                                width={1145}
                                height={1145}
                                loading="lazy"
                                priority={false}
                            />
                        </div>
                    </div>
                    {services.map((service) => (
                        <div key={service.id} className="flx-c srv-description">
                            <Link href={`/services#avec-permis`} passHref>
                                {service.title}
                            </Link>
                            <div className="flx-c icon-description">
                                <Image
                                    src={service.imgSrc}
                                    alt={service.imgAlt}
                                    width={1145}
                                    height={1145}
                                    loading="lazy"
                                    priority={false}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Confirmed;
