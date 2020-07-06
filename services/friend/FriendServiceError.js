class FriendServiceError extends Error {
  constructor(message) {
    super(message)
    this.name = "FriendServiceError"
  }
}

module.exports = FriendServiceError