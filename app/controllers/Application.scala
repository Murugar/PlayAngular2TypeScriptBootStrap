package controllers

import play.api._
import play.api.mvc._

class Application extends Controller {

  def index = Action {
    Ok(views.html.index1())
  }

  def notFound(notFound: String) = Default.notFound

  def other(others: String) = index
}
