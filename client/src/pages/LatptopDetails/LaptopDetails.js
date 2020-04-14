import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { MDBContainer, MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBTable, MDBTableBody } from "mdbreact";
import { SectionHeader } from "../../ui";

import "./LaptopDetails.scss";

const LaptopDetails = () => {
	const params = useParams();
	const laptops = useSelector((state) => state.laptop.laptops);

	// Find needed laptop with id recieved from router history
	const laptop = laptops.find((item) => item._id === params.id);

	useEffect(() => {
		// Scroll page to top when enter the page
		document.body.scrollTop = document.documentElement.scrollTop = 0;
	});

	// Generate slides from laptop images, received from server
	const createSlides = () =>
		laptop.images.map((image, index) => (
			<MDBCarouselItem itemId={index + 1} key={index}>
				<MDBView>
					<img className="" src={image} alt="slide" />
				</MDBView>
			</MDBCarouselItem>
		));

	return (
		<section className="details">
			<MDBContainer>
				<SectionHeader title="Полное описание" />
				<h4 className="my-4 text-center font-weight-bold">{laptop.name}</h4>
				<MDBCarousel
					className="details__slider"
					activeItem={1}
					length={laptop.images.length}
					showControls={true}
					showIndicators={true}
					interval={2000}
				>
					<MDBCarouselInner>{createSlides()}</MDBCarouselInner>
				</MDBCarousel>
				<h4 className="my-4 text-center font-weight-bold">Характеристики</h4>
				<MDBTable striped responsive>
					<MDBTableBody>
						<tr>
							<td className="font-weight-bold w-25">Короткое описание:</td>
							<td>{laptop.description}</td>
						</tr>
						<tr>
							<td className="font-weight-bold w-25">Экран:</td>
							<td>{laptop.screen}</td>
						</tr>
						<tr>
							<td className="font-weight-bold w-25">Процессор:</td>
							<td>{laptop.processor}</td>
						</tr>
						<tr>
							<td className="font-weight-bold w-25">Оперативная память:</td>
							<td>{laptop.ram}</td>
						</tr>
						<tr>
							<td className="font-weight-bold w-25">Операционная система:</td>
							<td>{laptop.os}</td>
						</tr>
						<tr>
							<td className="font-weight-bold w-25">Видеокарта:</td>
							<td>{laptop.gpu}</td>
						</tr>
						<tr>
							<td className="font-weight-bold w-25">Цвет:</td>
							<td>{laptop.color}</td>
						</tr>
						<tr>
							<td className="font-weight-bold w-25">Клавиатура:</td>
							<td>{laptop.keyboard}</td>
						</tr>
						<tr>
							<td className="font-weight-bold w-25">Жесткий диск:</td>
							<td>{laptop.hardDrive}</td>
						</tr>
						<tr>
							<td className="font-weight-bold w-25">Порты:</td>
							<td>{laptop.ports}</td>
						</tr>
						<tr>
							<td className="font-weight-bold w-25">Батарея:</td>
							<td>{laptop.battery}</td>
						</tr>
						<tr>
							<td className="font-weight-bold w-25">Вес:</td>
							<td>{laptop.weight}</td>
						</tr>
					</MDBTableBody>
				</MDBTable>
			</MDBContainer>
		</section>
	);
};

export default LaptopDetails;
