pragma solidity ^0.8.9;

contract SocialMedia {
    struct Post {
        uint256 postId;
        address author;
        string imageHash;
        string text;
        string postType;
        uint256 timestamp;
    }

    mapping(uint256 => Post) public posts;
    uint256 public postCount;

    event PostCreated(uint256 postId, address indexed author, string imageHash, string text, string postType, uint256 timestamp);

    function createPost(string memory _imageHash, string memory _text, string memory _postType) public {
        require(bytes(_imageHash).length > 0, "Image hash cannot be empty");
        require(bytes(_text).length > 0, "Text cannot be empty");
        require(bytes(_postType).length > 0, "Post type cannot be empty");
        postCount++;
        posts[postCount] = Post(postCount, msg.sender, _imageHash, _text, _postType, block.timestamp);
        emit PostCreated(postCount, msg.sender, _imageHash, _text, _postType, block.timestamp);
    }

    function getPost(uint256 _postId) public view returns (uint256, address, string memory, string memory, string memory, uint256) {
        require(_postId > 0 && _postId <= postCount, "Invalid post ID");
        Post memory post = posts[_postId];
        return (post.postId, post.author, post.imageHash, post.text, post.postType, post.timestamp);
    }

     function getUserPosts(address _user) public view returns (uint256[] memory) {
        uint256[] memory userPosts = new uint256[](postCount);
        uint256 count = 0;
        for (uint256 i = 1; i <= postCount; i++) {
            if (posts[i].author == _user) {
                userPosts[count] = i;
                count++;
            }
        }
        uint256[] memory result = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = userPosts[i];
        }
        return result;
    }
}
