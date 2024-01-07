import { StatusCodes } from "http-status-codes";
import {
  Controller,
  Get,
  OperationId,
  Response,
  Route,
  Security,
  Tags,
} from "tsoa";
import { TopicDocument } from "../../database/models/topics/topic";
import TopicsService from "../../services/topics/topics_service";

@Route("/api/v1/topic")
@Tags("Topics")
export class TopicsController extends Controller {
  //!
  //!
  /**
   * Retrieves posts with given parameters, with pagination.
   */
  @Get("/topics")
  @OperationId("getTopics")
  @Response(StatusCodes.OK)
  @Response(StatusCodes.UNAUTHORIZED, "Unauthorized")
  @Security("jwt")
  public async getTopics(): Promise<TopicDocument[]> {
    const topics = await new TopicsService().getTopics();
    return topics;
  }
}
