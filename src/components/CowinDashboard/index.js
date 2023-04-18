// Write your code here
import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {
    vaccinationCoverage: [],
    vaccinationByAge: [],
    vaccinationByGender: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount = () => {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const response = await fetch('https://apis.ccbp.in/covid-vaccination-data')
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updateVaccinationCoverage = fetchedData.last_7_days_vaccination.map(
        eachObject => ({
          doseOne: eachObject.dose_1,
          doseTwo: eachObject.dose_2,
          vaccineDate: eachObject.vaccine_date,
        }),
      )
      const updateVaccinationByAge = fetchedData.vaccination_by_age
      const updateVaccinationByGender = fetchedData.vaccination_by_gender

      this.setState({
        vaccinationCoverage: updateVaccinationCoverage,
        vaccinationByAge: updateVaccinationByAge,
        vaccinationByGender: updateVaccinationByGender,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div data-testid="loader" className="inner-container">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderPieCharts = () => {
    const {
      vaccinationCoverage,
      vaccinationByAge,
      vaccinationByGender,
    } = this.state
    return (
      <>
        <VaccinationCoverage details={vaccinationCoverage} />
        <VaccinationByGender detailsByGender={vaccinationByGender} />
        <VaccinationByAge detailsByAge={vaccinationByAge} />
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
        alt="failure view"
      />
      <h1 className="failure-heading">Something went wrong</h1>
    </div>
  )

  renderFromSwitchFunction = apiStatus => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderPieCharts()
      default:
        return null
    }
  }

  render() {
    const {apiStatus} = this.state
    return (
      <div className="app-container">
        <div className="inner-container">
          <div className="logo-and-title-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
              className="logo"
            />
            <h1 className="title">Co-WIN</h1>
          </div>
          <h1 className="description">CoWIN vaccination in India</h1>
          {this.renderFromSwitchFunction(apiStatus)}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
