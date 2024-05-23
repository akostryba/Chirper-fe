const users = [
    {
        userId: 1,
        username: "Andrew",
        password: "password",
        bio: "Student at DePaul University",
        profileImage: "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3Dhttps://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
    },
    {
        userId: 2,
        username: "Mark",
        password: "password",
        bio: "Student at DePaul University",
        profileImage: "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?cs=srgb&dl=pexels-andrewpersonaltraining-697509.jpg&fm=jpg",
    },
    {
        userId: 3,
        username: "Alex",
        password: "password",
        bio: "Associate at RSM",
        profileImage: "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg",
    }
];

const followers = [
    {
        followerId: 1,
        followingId: 2
    },
    {
        followerId: 1,
        followingId: 3
    },
    {
        followerId: 2,
        followingId: 1
    },
    {
        followerId: 2,
        followingId: 3
    },
    {
        followerId: 3,
        followingId: 1
    }
];

const posts = [
    {
        postId: 1,
        userId: 1,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adminim veniam, quis nostrud exercitation ullamco laboris nisi utaliquip ex ea commodo consequat. Duis aute irure.",
        createdAt: '2024-04-03'
    },
    {
        postId: 2,
        userId: 3,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adminim veniam, quis nostrud exercitation ullamco laboris nisi utaliquip ex ea commodo consequat. Duis aute irure.",
        createdAt: '2024-04-03'
    },
    {
        postId: 3,
        userId: 2,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adminim veniam, quis nostrud exercitation ullamco laboris nisi utaliquip ex ea commodo consequat. Duis aute irure.",
        createdAt: '2024-04-03'
    }
];

const comments = [
    {
        commentId: 1,
        userId: 2,
        postId: 1,
        text: "What a twat.",
        createdAt: '2024-04-03'
    },
    {
        commentId: 2,
        userId: 3,
        postId: 2,
        text: "Go on mate.",
        createdAt: '2024-04-03'
    }
];

export {users, followers, posts, comments};