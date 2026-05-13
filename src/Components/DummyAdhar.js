import React, {
    useEffect,
    useState
} from "react";

function DummyAdhar() {

    const [data, setData] =
        useState(null);

    useEffect(() => {

        const fetchData = async () => {

            try {

                console.log(
                    "About to fetch dummy Aadhaar data..."
                );

                const response = await fetch(
                    "https://suffering-sabbath-onstage.ngrok-free.dev/student/statusByAadhaar?aadhaar=111122223333"
                );

                console.log(
                    "After fetched dummy Aadhaar data..."
                );

                const result =
                    await response.json();

                setData(result);

                console.log(
                    "Dummy Aadhaar API Response:",
                    result
                );

            } catch (error) {

                console.log(
                    "API Error:",
                    error
                );
            }
        };

        fetchData();

    }, []);

    return (

        <div>

            <h2>
                Dummy Aadhaar Component
            </h2>

            <div>
                "Data from API:    "
                {data
                    ? JSON.stringify(data)
                    : "Loading..."}

            </div>

        </div>
    );
}

export default DummyAdhar;