const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");

// const SocialMedia = artifacts.require("Post");

contract("Post", (accounts) => {
    let socialMediaInstance;

    before(async () => {
        socialMediaInstance = await SocialMedia.deployed();
    });

    it("should create a post", async () => {
        const imageHash = "QmTmTujFF3PS3wUyNvU6naiU6eTvU6B4GZJ4Q4azJSHT89";
        const text = "This is a test post";
        const postType = "image";

        const result = await socialMediaInstance.createPost(imageHash, text, postType, { from: accounts[0] });

        assert.equal(result.logs[0].event, "PostCreated", "PostCreated event should be emitted");
        assert.equal(result.logs[0].args.author, accounts[0], "Post author should be the sender's address");
        assert.equal(result.logs[0].args.imageHash, imageHash, "Post image hash should match");
        assert.equal(result.logs[0].args.text, text, "Post text should match");
        assert.equal(result.logs[0].args.postType, postType, "Post type should match");
    });

    it("should get a post by ID", async () => {
        const postId = 1;

        const result = await socialMediaInstance.getPost(postId);

        assert.equal(result[0].toNumber(), postId, "Post ID should match");
        assert.equal(result[1], accounts[0], "Post author should match");
        assert.equal(result[2], "QmTmTujFF3PS3wUyNvU6naiU6eTvU6B4GZJ4Q4azJSHT89", "Post image hash should match");
        assert.equal(result[3], "This is a test post", "Post text should match");
        assert.equal(result[4], "image", "Post type should match");
    });

    it("should get user posts", async () => {
        const user = accounts[0];

        const result = await socialMediaInstance.getUserPosts(user);

        assert.equal(result.length, 1, "Number of user posts should match");
        assert.equal(result[0].toNumber(), 1, "User post ID should match");
    });
});
