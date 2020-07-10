// Express
const express = require('express')
// Middleware
const {auth, checkObjectId} = require('../../../middleware')
// Utils
const {sendServerError, sendBadRequest} = require('../../../utils/sendStatus')
// Services
const friendService = require('../../../services/friend/friend')


const router = express.Router()

/**
 * @api {get} /user/friend/me My Friend List
 * @apiVersion 0.1.0
 * @apiName My Friends
 * @apiGroup Friend
 * @apiDescription Get all friend list of authenticated user
 * @apiPermission user
 * @apiHeader {String} Authorization Token of User.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWU4YWI5MWZlMTk5ZjE1YzYyYTQzM2UiLCJpYXQiOjE1OTIzMDc0NDh9.DqgT0RH6g1Mm8fpbXYz6Bf4KGnsUxo-Vk-UNKmvptjk"
 *    }
 * @apiSuccess (200) {String[]} whiteList Friends in white list.
 * @apiSuccess (200) {String[]} inComingList Incoming friend requests.
 * @apiSuccess (200) {String[]} outComingList Outcoming friend requests.
 * @apiSuccess (200) {String[]} blackList People in black list.
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 Success
 *    {
 *      "whiteList": [],
 *      "inComingList": [],
 *      "outComingList": [],
 *      "blackList": [],
 *    }
 */
router.get(
  '/me',
  auth,
  async (req, res) => {
    try {
      const friends = await friendService.getFriends(req.userId)
      res.json(friends)
    } catch (e) {
      sendServerError(res, e)
    }
  }
)

/**
 * @api {get} /user/friend/me/whitelist My white list
 * @apiVersion 0.1.0
 * @apiName My White list
 * @apiGroup Friend
 * @apiDescription Get white list of authenticated user
 * @apiPermission user
 * @apiHeader {String} Authorization Token of User.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWU4YWI5MWZlMTk5ZjE1YzYyYTQzM2UiLCJpYXQiOjE1OTIzMDc0NDh9.DqgT0RH6g1Mm8fpbXYz6Bf4KGnsUxo-Vk-UNKmvptjk"
 *    }
 * @apiSuccess (200) {String[]} whiteList Friends in white list.
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 Success
 *    {
 *      "whiteList": [],
 *    }
 */
router.get(
  '/me/whitelist',
  auth,
  async (req, res) => {
    try {
      const whiteList = await friendService.getWhiteList(req.userId)
      res.json(whiteList)
    } catch (e) {
      sendServerError(res, e)
    }
  }
)

/**
 * @api {get} /user/friend/me/blackList My black list
 * @apiVersion 0.1.0
 * @apiName My Black list
 * @apiGroup Friend
 * @apiDescription Get black list of authenticated user
 * @apiPermission user
 * @apiHeader {String} Authorization Token of User.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWU4YWI5MWZlMTk5ZjE1YzYyYTQzM2UiLCJpYXQiOjE1OTIzMDc0NDh9.DqgT0RH6g1Mm8fpbXYz6Bf4KGnsUxo-Vk-UNKmvptjk"
 *    }
 * @apiSuccess (200) {String[]} blackList Friends in white list.
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 Success
 *    {
 *      "blackList": [],
 *    }
 */
router.get(
  '/me/blacklist',
  auth,
  async (req, res) => {
    try {
      const blackList = await friendService.getBlackList(req.userId)
      res.json(blackList)
    } catch (e) {
      sendServerError(res, e)
    }
  }
)

/**
 * @api {get} /user/friend/me/incominglist My incoming request
 * @apiVersion 0.1.0
 * @apiName My incoming requests
 * @apiGroup Friend
 * @apiDescription Get incoming request list of authenticated user
 * @apiPermission user
 * @apiHeader {String} Authorization Token of User.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWU4YWI5MWZlMTk5ZjE1YzYyYTQzM2UiLCJpYXQiOjE1OTIzMDc0NDh9.DqgT0RH6g1Mm8fpbXYz6Bf4KGnsUxo-Vk-UNKmvptjk"
 *    }
 * @apiSuccess (200) {String[]} inComingList Friends in incoming list.
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 Success
 *    {
 *      "inComingList": [],
 *    }
 */
router.get(
  '/me/incominglist',
  auth,
  async (req, res) => {
    try {
      const inComingList = await friendService.getInComingList(req.userId)
      res.json(inComingList)
    } catch (e) {
      sendServerError(res, e)
    }
  }
)

/**
 * @api {get} /user/friend/me/outcominglist My outcoming request
 * @apiVersion 0.1.0
 * @apiName My outcoming requests
 * @apiGroup Friend
 * @apiDescription Get incoming request list of authenticated user
 * @apiPermission user
 * @apiHeader {String} Authorization Token of User.
 * @apiHeaderExample {json} Header-Example:
 *    {
 *      "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWU4YWI5MWZlMTk5ZjE1YzYyYTQzM2UiLCJpYXQiOjE1OTIzMDc0NDh9.DqgT0RH6g1Mm8fpbXYz6Bf4KGnsUxo-Vk-UNKmvptjk"
 *    }
 * @apiSuccess (200) {String[]} outComingList Friends in outcoming list.
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 Success
 *    {
 *      "outComingList": [],
 *    }
 */
router.get(
  '/me/outcominglist',
  auth,
  async (req, res) => {
    try {
      const outComingList = await friendService.getOutComingList(req.userId)
      res.json(outComingList)
    } catch (e) {
      sendServerError(res, e)
    }
  }
)

/**
 * @api {get} /user/friend/:id/whitelist User white list
 * @apiVersion 0.1.0
 * @apiName Selected user whitelist
 * @apiGroup Friend
 * @apiDescription Get white list of selected user
 * @apiParam {ObjectId} id User`s id
 * @apiSuccess (200) {String[]} whiteList Friends in white list.
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 Success
 *    {
 *      "whiteList": [],
 *    }
 */
router.get(
  '/:id/whitelist',
  [auth, checkObjectId('id')],
  async (req, res) => {
    try {
      const whitelist = await friendService.getWhiteList(req.params.id)
      res.json(whitelist)
    } catch (e) {
      sendServerError(res, e)
    }
  }
)

/**
 * @api {put} /user/friend/:id/addRequest Add request
 * @apiVersion 0.1.0
 * @apiName Add request
 * @apiGroup Friend
 * @apiDescription Add request to user
 * @apiParam {ObjectId} id User`s id
 * @apiSuccess (201) {String} Success created message
 * @apiSuccessExample {json} Created-Response:
 *    HTTP/1.1 201 Created
 *    {
 *        "msg": "Запрос отправлен"
 *    }
 */
router.put(
  '/:id/addRequest',
  [auth, checkObjectId('id')],
  async (req, res) => {
    try {
      const targetId = req.params.id
      const senderId = req.userId

      const msg = await friendService.addRequest(senderId, targetId)
      res.status(201).json({msg})
    } catch (e) {
      if (e instanceof friendService.Error) {
        return sendBadRequest(res, e.message)
      }
      sendServerError(res, e)
    }
  }
)

/**
 * @api {put} /user/friend/:id/removeRequest Remove request
 * @apiVersion 0.1.0
 * @apiName Remove request
 * @apiGroup Friend
 * @apiDescription Remove request from user
 * @apiParam {ObjectId} id User`s id
 * @apiSuccess (200) {String} Success created message
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 Success
 *    {
 *        "msg": "Запрос отменён"
 *    }
 */
router.put(
  '/:id/removeRequest',
  [auth, checkObjectId('id')],
  async (req, res) => {
    try {
      const targetId = req.params.id
      const senderId = req.userId

      const msg = await friendService.removeRequest(senderId, targetId)
      res.json({msg})
    } catch (e) {
      if (e instanceof friendService.Error) {
        return sendBadRequest(res, e.message)
      }
      sendServerError(res, e)
    }
  }
)

// f(acceptRequest):
// +addToWhiteList owner
// +addToWhiteList sender
// +remFromOutComingList sender

// f(rejectRequest):
// +remFromInComingList owner
// +remFromOutComingList sender

// f(blockUser):
// +addToBlackList owner
// +remFromInComingList owner
// +remFromWhiteList owner
// +remFromWhiteList sender
// +remFromOutComingList sender


module.exports = router