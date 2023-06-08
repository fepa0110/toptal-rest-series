import shortid from "shortid";
import debug from "debug";
import { CreateUserDto } from "../dto/create.user.dto";
import { PatchUserDto } from "../dto/patch.user.dto";
import { PutUserDto } from "../dto/put.user.dto";

import mongooseService from "../../common/services/mongoose.service";

const log: debug.IDebugger = debug("app:in-memory-dao");

/**
 * NEVER USER THIS CLASS IN REAL LIFE.
 * This class was created to ease the explanation of other topics in the corresponding article.
 * For any real-life scenario, consider using an ODM/ORM to manage your own database in a better way.
 */
class UsersDao {
	users: Array<CreateUserDto> = [];
	Schema = mongooseService.getMongoose().Schema;

	constructor() {
		log("Created new instance of UsersDao");
	}

	userSchema = new this.Schema(
		{
			_id: String,
			email: String,
			password: { type: String, select: false },
			firstName: String,
			lastName: String,
			permissionFlags: Number,
		},
		{ id: false }
	);

	User = mongooseService.getMongoose().model("Users", this.userSchema);
}

export default new UsersDao();
